module.exports = {
  name: "move",
  description: "Move the selected song to the provided position in the queue",
  usage: "<from> <to>",
  category: "music",
  options: [
    {
      name: "from",
      description: "The current position of the song",
      type: "NUMBER",
      required: true
    },
    {
      name: "to",
      description: "To which position, the song be moved",
      type: "NUMBER",
      required: true
    }
  ],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.wrongMessage(interaction, "Need at least \`3\` songs in the queue to use this command.");

    const from = interaction.options.getNumber("from", true) - 1;
    const to = interaction.options.getNumber("to", true) - 1;

    if (from < 0 || to < 0 || from > queue.tracks.length || !queue.tracks[from] || to > queue.tracks.length || !queue.tracks[to])
      return bot.say.wrongMessage(interaction, "Provided Song Index does not exist.");

    if (from === to)
      return bot.say.wrongMessage(interaction, "The song is already in this position.");

    const song = queue.splice(from, 1)[0];
    queue.splice(to, 0, song);

    return bot.say.successMessage(interaction, `**[${song.title}](${song.url})** has been moved to the **position ${to + 1}** in the queue.`);
  }
};