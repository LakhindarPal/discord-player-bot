module.exports = {
  name: "skip",
  description: "Skip current track",
  category: "music",
  execute(bot, interaction, queue) {
    if (queue.size < 1 && queue.repeatMode !== 3)
      return bot.say.errorEmbed(interaction, "The queue has no more track.");

    queue.node.skip();

    return bot.say.successEmbed(interaction, "Skipped the current track.");
  },
};
