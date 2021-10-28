module.exports = {
  name: "tracksAdd",
  execute(bot, queue, tracks) {
    return bot.say.queueMessage(queue, `Enqueued ${tracks.length} tracks.`);
  }
};