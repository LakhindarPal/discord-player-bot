module.exports = {
  name: "connectionError",
  execute(bot, queue, error) {
    bot.say.queueMessage(bot, queue, "An error occurred while playing. Sorry for the inconveniences.", "RED");

    return bot.utils.sendErrorLog(bot, { stack: `${error.message}`, name: "PLAYER_CONNECTION_ERROR", code: `${queue.id}` }, "error");
  }
};