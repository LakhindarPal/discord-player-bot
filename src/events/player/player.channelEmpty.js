module.exports = {
  name: "channelEmpty",
  execute(bot, queue) {
    return bot.say.queueMessage(bot, queue, "I have left the voice channel as I was left alone.");
  }
};