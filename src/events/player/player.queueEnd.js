module.exports = {
  name: "queueEnd",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "No more songs to play. Left the voice channel.");
  }
};