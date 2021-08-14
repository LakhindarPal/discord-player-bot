module.exports = {
  name: "queueEnd",
  execute(bot, queue) {
    return bot.say.queueMessage(bot, queue, "No more songs to play. Left the voice channel.");
  }
};