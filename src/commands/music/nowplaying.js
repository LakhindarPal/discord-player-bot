module.exports = {
  name: "nowplaying",
  description: "Show the currently playing track.",
  category: "music",
  execute(bot, interaction, queue) {
    const track = queue.currentTrack;

    const embed = bot.utils
      .baseEmbed(interaction)
      .setAuthor({ name: "Nowplaying 🎵" })
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setThumbnail(`${track.thumbnail}`)
      .setDescription(`Played by: ${track.requestedBy.toString()}\n
${queue.node.createProgressBar()}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  },
};
