module.exports = {
  name: "songinfo",
  description: "Shows details of a specific song.",
  category: "music",
  options: [{
    name: "index",
    type: "NUMBER",
    description: "That song index.",
    required: true
  }],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!queue.tracks[index] || index > queue.tracks.length || index < 0)
      return bot.say.errorMessage(interaction, "Provided Song Index does not exist.");

    const index = interaction.options.getNumber("index", true) - 1;

    const song = queue.tracks[index];

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor({ name: "Songinfo 🎵" })
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`~ Requested by: ${song.requestedBy.toString()}
Duration: ${song.duration}
Position in queue: ${index}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};