const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
  name: "lyrics",
  description: "Get lyrics for the song name.",
  category: "music",
  usage: "<song name>",
  options: [{
    name: "query",
    type: "STRING",
    description: "Provide the song name to search lyrics",
    required: true
  }],
  async execute(bot, interaction) {
    const songName = interaction.options.getString("query", true);

    const songNameFormated = songName
      .toLowerCase()
      .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

    try {
      const result = await lyricsClient.search(`${songNameFormated}`);

      if (!result || !result.lyrics)
        return bot.say.errorMessage(interaction, "No lyrics were found for this song.");

      const embed = bot.say.baseEmbed(interaction)
        .setTitle(`${songName}`)
        .setDescription(`${result.lyrics.slice(0, 4090)}...`);

      return interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
    } catch {
      return bot.say.errorMessage(interaction, "No lyrics were found for this song.");
    }
  }
};