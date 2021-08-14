const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "songinfo",
  description: "Shows details of the now playing song.",
  category: "music",
  subCommands: ["<songIndex>\nShows details of that specific song."],
  options: [{
    name: "index",
    type: "NUMBER",
    description: "That specific song index to show details.",
    required: false
  }],
  async execute(bot, interaction) {
    const index = interaction.options.getNumber("index", false);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    let song = queue.current;

    if (index) {
      songNum = (index - 1);

      if (!queue.tracks[songNum] || songNum > queue.tracks.length || songNum < 0)
        return bot.say.errorMessage(interaction, "Provided Song Index does not exist.");

      song = queue.tracks[songNum]
    }

    const embed = new MessageEmbed()
      .setColor(interaction.guild.me.displayColor || "#00FFFF")
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`);

    if (song === queue.current) {
      embed.setAuthor(`Now playing 🎶`)
        .setDescription(`~ Played by: ${song.requestedBy.toString()}
${queue.createProgressBar()}`);
    } else {
      embed.setAuthor("Songinfo 🎵")
        .setDescription(`~ Requested by: ${song.requestedBy.toString()}
Duration: ${song.duration}
Position in queue: ${index}`);
    }

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
  }
};
