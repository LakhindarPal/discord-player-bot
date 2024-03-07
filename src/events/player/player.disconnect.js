module.exports = {
  name: "disconnect",
  execute(bot, queue) {
    return bot.say.queueEmbed(queue, "Looks like my job here is done, leaving now.");
  },
};
