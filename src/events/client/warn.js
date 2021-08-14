module.exports = {
  name: "warn",
  execute(bot, error) {
    return bot.utils.sendErrorLog(bot, error, "warning");
  }
};