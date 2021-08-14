require("./modules/checkValid")();

const { Collection, Client, Intents } = require("discord.js");
const { Player } = require("discord-player");

const { botToken } = require("../config.json");
const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
  allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

bot.commands = new Collection();

bot.logger = Logger;
bot.utils = Util;
bot.say = Embeds;

bot.player = new Player(bot, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 100
});

require("moment-duration-format");
require("./handler/EventHandler")(bot);

bot.login(botToken);

//bot.setMaxListeners(0)

// Unhandled errors
process.on("unhandledRejection", (error) => Util.sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => Util.sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => {
  Util.sendErrorLog(bot, warning, "warning");
});
