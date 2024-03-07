module.exports = {
  name: "clear",
  description: "Clear the tracks in the queue.",
  category: "music",
  execute(bot, interaction, queue) {
    if (queue.size < 2) return bot.say.errorEmbed(interaction, "The queue has no more track.");

    queue.tracks.clear();

    return bot.say.successEmbed(interaction, "Cleared the queue tracks.");
  },
};
