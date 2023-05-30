module.exports = {
  name: "playerSkip",
  execute(bot, queue, track) {
    return bot.say.queueEmbed(queue, `Skipping **${track.title}** due to an issue!`);
  },
};
