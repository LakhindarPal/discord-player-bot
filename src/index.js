require("dotenv").config();
require("./modules/checkValid");

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { Player } = require("discord-player");
const { default: DeezerExtractor } = require("discord-player-deezer");
const { default: TidalExtractor } = require("discord-player-tidal");
const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

bot.commands = new Collection();
bot.cooldowns = new Collection();

bot.logger = require("./modules/logger");
bot.utils = require("./modules/utils");
bot.say = require("./modules/reply");

const player = Player.singleton(bot);
player.extractors.register(DeezerExtractor);
player.extractors.register(TidalExtractor);
player.extractors.loadDefault();

require("./handlers/Event")(bot);

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// unhandled errors
process.on("unhandledRejection", (error) => bot.utils.sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => bot.utils.sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => {
  bot.utils.sendErrorLog(bot, warning, "warning");
});
