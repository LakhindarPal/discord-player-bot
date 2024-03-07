module.exports = {
  name: "pause",
  description: "Pause the playback",
  category: "music",
  execute(bot, interaction, queue) {
    if (queue.node.isPaused())
      return bot.say.wrongEmbed(interaction, "The playback is already paused.");

    queue.node.pause();

    return bot.say.successEmbed(interaction, "Paused the playback.");
  },
};
