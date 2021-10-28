module.exports = {
  name: "shuffle",
  description: "Shuffles the queue.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.warnMessage(interaction, "Need at least \`3\` songs in the queue to shuffle.");

    queue.shuffle();

    return bot.say.successMessage(interaction, "Shuffled the queue.");
  }
};