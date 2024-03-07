const { ApplicationCommandOptionType } = require("discord.js");
const { lyricsExtractor } = require("@discord-player/extractor");
const lyricsFinder = lyricsExtractor();

module.exports = {
  name: "lyrics",
  description: "Get lyrics for a track.",
  category: "music",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "query",
      description: "The track title to search lyrics",
      required: false,
    },
  ],
  async execute(bot, interaction, queue) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query", false) ?? queue?.currentTrack?.title;

    if (!query) return bot.say.wrongEmbed(interaction, "You forgot to provide the track name.");

    const queryFormated = query
      .toLowerCase()
      .replace(
        /\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g,
        ""
      );

    const result = await lyricsFinder.search(queryFormated).catch(() => null);

    if (!result || !result.lyrics)
      return bot.say.errorEmbed(interaction, "No lyrics were found for this track.");

    const lyrics =
      result.lyrics.length > 4096 ? `${result.lyrics.slice(0, 4090)}...` : result.lyrics;

    const embed = bot.utils
      .baseEmbed(interaction)
      .setTitle(result.title)
      .setURL(result.url)
      .setThumbnail(result.thumbnail)
      .setAuthor({
        name: result.artist.name,
        iconURL: result.artist.image,
        url: result.artist.url,
      })
      .setDescription(lyrics);

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  },
};
