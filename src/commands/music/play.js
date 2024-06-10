import { ApplicationCommandOptionType } from "discord.js";
import { useMainPlayer, QueueRepeatMode } from "discord-player";
import { BaseEmbed, ErrorEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "play",
  description: "Play a song or playlist from url or name",
  category: "music",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "query",
      description: "The name or url of the song, you want to play.",
      required: true,
      min_length: 1,
      max_length: 256,
      autocomplete: true,
    },
  ],
  validateVC: true,
};
export async function execute(interaction) {
  const channel = interaction.member?.voice?.channel;
  const checks = [
    {
      condition: !channel,
      message: "You need to join a voice channel first.",
    },
    {
      condition: !channel.viewable,
      message: "I need `View Channel` permission.",
    },
    {
      condition: !channel.speakable,
      message: "I need `Speak Channel` permission.",
    },
    {
      condition: !channel.joinable,
      message: "I need `Connect Channel` permission.",
    },
    {
      condition: channel.full,
      message: "Can't join, the voice channel is full.",
    },
    {
      condition: interaction.member.voice.deaf,
      message: "You cannot run this command while deafened.",
    },
    {
      condition: interaction.guild.members.me?.voice?.mute,
      message: "Please unmute me before playing.",
    },
  ];

  for (const check of checks) {
    if (check.condition)
      return interaction.reply({
        ephemeral: true,
        embeds: [ErrorEmbed(check.message)],
      });
  }

  const query = interaction.options.getString("query", true);
  const player = useMainPlayer();
  await interaction.deferReply();

  const result = await player.search(query, {
    requestedBy: interaction.user,
  });

  if (!result.hasTracks())
    return interaction.editReply({
      embeds: [ErrorEmbed(`No results found for \`${query}\`.`)],
    });

  try {
    const { queue, track, searchResult } = await player.play(channel, result, {
      nodeOptions: {
        metadata: interaction,
        volume: 70,
        repeatMode: QueueRepeatMode.AUTOPLAY,
        noEmitInsert: true,
        leaveOnStop: false,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 60_000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 60_000,
        pauseOnEmpty: true,
        preferBridgedMetadata: true,
        disableBiquad: true,
      },
      requestedBy: interaction.user,
      connectionOptions: { deaf: true },
    });

    const embed = BaseEmbed().setFooter({
      text: `Requested by: ${interaction.user.tag}`,
      iconURL: interaction.member.displayAvatarURL(),
    });

    if (searchResult.hasPlaylist()) {
      const playlist = searchResult.playlist;
      embed
        .setAuthor({
          name: `Playlist queued - ${playlist.tracks.length} tracks.`,
        })
        .setTitle(playlist.title)
        .setURL(playlist.url)
        .setThumbnail(playlist.thumbnail);
    } else {
      embed
        .setAuthor({
          name: `Track queued - Position ${queue.node.getTrackPosition(track) + 1}`,
        })
        .setTitle(track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail);
    }

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  } catch (e) {
    console.error(e);
    return interaction.editReply({
      embeds: [ErrorEmbed(`Something went wrong while playing \`${query}\``)],
    });
  }
}
