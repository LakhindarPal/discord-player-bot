module.exports = {
  name: "move",
  description: "Move the selected song to the provided position in the queue",
  usage: "<from> [to]",
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
      required: false
    }
  ],
  async execute(bot, interaction) {
    const fromIndex = await interaction.options.getNumber("from", true);
    const toIndex = await interaction.options.getNumber("to") ?? 1;

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.warnMessage(interaction, "Need at least \`3\` songs in the queue to use this command.");

    const fr = fromIndex - 1;
    const to = toIndex - 1;

    if (fr < 0 || to < 0 || fr > queue.tracks.length || !queue.tracks[fr] || to > queue.tracks.length || !queue.tracks[to])
      return bot.say.warnMessage(interaction, "Provided Song Index does not exist.");

    if (fr === to)
      return bot.say.warnMessage(interaction, "The song is already in this position.");

    const song = queue.tracks[fr];
    queue.splice(fr, 1);
    queue.splice(to, 0, song);

    return bot.say.successMessage(interaction, `**[${song.title}](${song.url})** has been moved to the **position ${toIndex}** in the queue.`);
  }
};