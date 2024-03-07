const { Events } = require("discord.js");

module.exports = {
  name: Events.Warn,
  execute(bot, error) {
    return bot.utils.sendErrorLog(bot, error, "warning");
  },
};
