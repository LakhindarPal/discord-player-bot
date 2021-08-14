module.exports = {
  name: "error",
  execute(bot, error) {
    return bot.utils.sendErrorLog(bot, error, "error");
  }
};