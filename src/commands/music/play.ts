import {
  ChannelType,
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  type GuildMember,
  SlashCommandBuilder,
} from "discord.js";

import { useMainPlayer } from "discord-player";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import playerOptions from "../../constants/player-options";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a song or playlist from query or URL.")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("Track title, keywords, or URL.")
      .setRequired(true),
  );

export const meta: CommandMeta = {
  category: "music",
};

export async function execute(interaction: ChatInputCommandInteraction) {
  const query = interaction.options.getString("query", true);
  const member = interaction.member as GuildMember | null;
  const channel = member?.voice?.channel;

  if (!channel) {
    return interaction.reply(
      replies.error("You need to join a voice channel first."),
    );
  }

  if (!channel.viewable) {
    return interaction.reply(
      replies.error("I need the `View Channel` permission."),
    );
  }

  if (!channel.joinable) {
    return interaction.reply(replies.error("I need the `Connect` permission."));
  }

  if (channel.type === ChannelType.GuildVoice && !channel.speakable) {
    return interaction.reply(replies.error("I need the `Speak` permission."));
  }

  if (channel.full) {
    return interaction.reply(
      replies.error("Cannot join, the channel is full."),
    );
  }

  if (member?.voice.deaf) {
    return interaction.reply(
      replies.error("You cannot listen while server-deafened."),
    );
  }

  const me = interaction.guild?.members.me;
  if (me?.voice.mute) {
    return interaction.reply(replies.error("Please unmute me before playing."));
  }

  const player = useMainPlayer();

  await interaction.deferReply();

  const result = await player.search(query, {
    requestedBy: interaction.user,
  });

  if (!result.hasTracks()) {
    return interaction.editReply(
      replies.error(`No results found for \`${query}\`.`, false),
    );
  }

  try {
    const { queue, track, searchResult } = await player.play(channel, result, {
      connectionOptions: { deaf: true },
      nodeOptions: {
        metadata: { channel: interaction.channel },
        ...playerOptions,
      },
      requestedBy: interaction.user,
    });

    const embed = new EmbedBuilder().setColor(Colors.Blurple);

    if (searchResult.hasPlaylist()) {
      const playlist = searchResult.playlist;
      const trackCount = playlist?.tracks.length ?? 0;
      embed
        .setAuthor({
          iconURL: playlist?.thumbnail,
          name: `Playlist enqueued (${trackCount} ${pluralize(trackCount, "track")})`,
        })
        .setDescription(`[${playlist?.title}](${playlist?.url})`);
    } else {
      embed
        .setAuthor({
          iconURL: track.thumbnail,
          name: `Track enqueued (#${queue.node.getTrackPosition(track) + 1})`,
        })
        .setDescription(track.toHyperlink());
    }

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  } catch (e) {
    console.error(e);
    return interaction.editReply(
      replies.error(`An error occurred while playing \`${query}\`.`, false),
    );
  }
}
