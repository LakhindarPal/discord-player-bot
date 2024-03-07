const { Events } = require("discord.js");

module.exports = {
  name: Events.Error,
  execute(bot, error) {
    return bot.utils.sendErrorLog(bot, error, "error");
  },
};
