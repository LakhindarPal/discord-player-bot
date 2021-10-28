module.exports = {
  name: "clear",
  description: "Clears the current queue.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "There is currently no song in the queue.");

    queue.clear();

    return bot.say.successMessage(interaction, "Cleared the queue.");
  }
};