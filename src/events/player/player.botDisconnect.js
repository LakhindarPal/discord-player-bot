module.exports = {
  name: "botDisconnect",
  execute(bot, queue) {
    return bot.say.queueMessage(bot, queue, "Music stopped as I had been disconnected from the voice channel.", "RED");
  }
};