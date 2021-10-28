module.exports = {
  name: "error",
  execute(bot, queue, error) {
    bot.utils.sendErrorLog(bot, error, "error");

    return bot.say.queueMessage(queue, `An error occurred while playing.\nReason: ${error.message}`, "RED");
  }
};