module.exports = {
  name: "emptyChannel",
  execute(bot, queue) {
    return bot.say.queueEmbed(queue, "Feeling lonely, leaving now.");
  },
};
