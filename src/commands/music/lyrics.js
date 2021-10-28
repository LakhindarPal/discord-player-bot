const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
  name: "lyrics",
  description: "Get lyrics for a song.",
  usage: "[songName]",
  category: "music",
  options: [{
    type: "STRING",
    name: "query",
    description: "The song title to search lyrics",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const queue = bot.player.getQueue(interaction.guild.id);

    const query = interaction.options.getString("query", false) ?? queue?.current?.title;

    if (!query)
      return bot.say.errorMessage(interaction, "You forgot to provide the song name.");

    const queryFormated = query
      .toLowerCase()
      .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

    const result = await lyricsClient.search(`${queryFormated}`);

    if (!result || !result.lyrics)
      return bot.say.errorMessage(interaction, "No lyrics were found for this song.");

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${query}`)
      .setDescription(`${result.lyrics.slice(0, 4090)}...`);

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  }
};