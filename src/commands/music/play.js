import { ApplicationCommandOptionType } from "discord.js";
import { useMainPlayer, QueryType } from "discord-player";
import { BaseEmbed, ErrorEmbed } from "../../modules/Embeds.js";
import playerOptions from "../../config/playerOptions.js";

export const data = {
  name: "play",
  description: "Play a song or playlist from url or name",
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
    {
      type: ApplicationCommandOptionType.String,
      name: "source",
      description: "The search engine you want to use.",
      choices: [
        {
          name: "YouTube",
          value: QueryType.YOUTUBE_SEARCH,
        },
        {
          name: "SoundCloud",
          value: QueryType.SOUNDCLOUD_SEARCH,
        },
        {
          name: "Spotify",
          value: QueryType.SPOTIFY_SEARCH,
        },
        {
          name: "Apple Music",
          value: QueryType.APPLE_MUSIC_SEARCH,
        },
      ],
    },
  ],
  category: "music",
  validateVC: true,
};

export async function suggest(interaction) {
  const query = interaction.options.getString("query", false)?.trim();
  if (!query) return;

  const player = useMainPlayer();
  const searchResult = await player.search(query).catch(() => null);
  if (!searchResult) {
    return interaction.respond([{ name: "No results found", value: "" }]);
  }

  const tracks = searchResult.hasPlaylist()
    ? searchResult.playlist.tracks.slice(0, 24)
    : searchResult.tracks.slice(0, 10);

  const formattedResult = tracks.map((track) => ({
    name: track.title,
    value: track.url,
  }));

  if (searchResult.hasPlaylist()) {
    formattedResult.unshift({
      name: `Playlist | ${searchResult.playlist.title}`,
      value: searchResult.playlist.url,
    });
  }

  return interaction.respond(formattedResult);
}

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
  const searchEngine =
    interaction.options.getString("source", false) ?? QueryType.AUTO;
  const player = useMainPlayer();

  await interaction.deferReply();

  const result = await player.search(query, {
    searchEngine,
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
        ...playerOptions,
      },
      requestedBy: interaction.user,
      connectionOptions: { deaf: true },
    });

    const embed = BaseEmbed();

    if (searchResult.hasPlaylist()) {
      const playlist = searchResult.playlist;
      embed
        .setTitle(`Playlist enqueued - ${playlist.tracks.length} tracks.`)
        .setDescription(`[${playlist.title}](${playlist.url})`);
    } else {
      embed
        .setTitle(
          `Track enqueued - Position ${queue.node.getTrackPosition(track) + 1}`
        )
        .setDescription(track.toHyperlink());
    }

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  } catch (e) {
    console.error(e);
    return interaction.editReply({
      embeds: [ErrorEmbed(`Something went wrong while playing \`${query}\``)],
    });
  }
}
