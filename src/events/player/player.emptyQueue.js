module.exports = {
  name: "emptyQueue",
  execute(bot, queue) {
    return bot.say.queueEmbed(queue, "No more tracks to play, leaving now.");
  },
};
