const DJS = require("discord.js");

/**
 * Send error log to discord channel
 * @param {DJS.Client} bot
 * @param {DJS.DiscordAPIError | DJS.HTTPError | Error } error
 * @param {"warning" | "error"} type
 */
async function sendErrorLog(bot, error, type) {
  try {
    if (
      error.message?.includes("Missing Access") ||
      error.message?.includes("Unknown Message") ||
      error.message?.includes("Missing Permissions")
    ) return;

    const { errorLogsChannel } = require("../../config.json");
    const channelId = errorLogsChannel;
    if (!channelId) {
      return bot.logger.error("ERR_LOG", error);
    }

    const channel = (bot.channels.cache.get(channelId) ||
      (await bot.channels.fetch(channelId)));

    if (!channel || !havePermissions(channel)) {
      return bot.logger.error("ERR_LOG", error);
    }

    const code = error.code || "N/A";
    const httpStatus = error.httpStatus || "N/A";
    const requestData = error.requestData ?? { json: {} };
    const name = error.name || "N/A";
    let stack = error.stack || error;
    let jsonString;

    try {
      jsonString = JSON.stringify(requestData.json, null, 2);
    } catch {
      jsonString = "";
    }

    if (typeof stack === "object") stack = JSON.stringify(stack);

    if (typeof stack === "string" && stack.length > 4096) {
      console.error(stack);
      stack = "An error occurred but was too long to send to Discord, check your console.";
    }

    const { codeBlock } = require("@discordjs/builders");

    const embed = new DJS.MessageEmbed()
      .setTitle("An error occurred")
      .addField("Name", name, true)
      .addField("Code", code.toString(), true)
      .addField("httpStatus", httpStatus.toString(), true)
      .addField("Timestamp", bot.logger.now, true)
      .addField("Request data", codeBlock(jsonString?.substr(0, 1020)))
      .setDescription(`${codeBlock(stack)}`)
      .setColor(type === "error" ? "RED" : "ORANGE");

    await channel.send({ embeds: [embed] });
  } catch (e) {
    console.error({ error });
    console.error(e);
  }
}

/**
 * Check if the bot has the default permissions
 * @param {DJS.Interaction | DJS.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
  const ch = "channel" in resolveable ? resolveable.channel : resolveable;
  if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel) return true;

  return (
    ch.permissionsFor(resolveable.guild.me)?.has(DJS.Permissions.FLAGS.VIEW_CHANNEL) &&
    ch.permissionsFor(resolveable.guild.me)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES) &&
    ch.permissionsFor(resolveable.guild.me)?.has(DJS.Permissions.FLAGS.EMBED_LINKS)
  );
}

/**
 * Capitalise a word
 * @param {string} word
 * @returns {string}
 */
function toCapitalize(word) {
  if (!word) return null;
  word = word.toString();

  return word.replace(/\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() +
        txt.substr(1).toLowerCase();
    });
}

/**
 * Format a number to local string
 * @param {number | string} n
 * @returns {string}
 */
function formatNumber(n) {
  return Number.parseFloat(String(n)).toLocaleString("be-BE");
}

/**
 * Format duration to string
 * @param {number} millisec Duration in milliseconds
 * @returns {string}
 */
function formatDuration(millisec) {
  if (!millisec || !Number(millisec)) return "0 Second";
  const seconds = Math.round((millisec % 60000) / 1000);
  const minutes = Math.floor((millisec % 3600000) / 60000);
  const hours = Math.floor(millisec / 3600000);
  if (hours > 0) return `${hours} Hour, ${minutes} Minute, ${seconds} Second`;
  if (minutes > 0) return `${minutes} Minute, ${seconds} Second`;
  return `${seconds} Second`;
};


/**
 * Convert formatted duration to milliseconds
 * @param {string} formatted duration input
 * @returns {number}
 */
function toMilliseconds(input) {
  if (!input) return 0;
  if (typeof input !== "string") return Number(input) || 0;
  if (input.match(/:/g)) {
    const time = input.split(":").reverse();
    let s = 0;
    for (let i = 0; i < 3; i++)
      if (time[i]) s += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
    if (time.length > 3) s += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
    return Number(s * 1000);
  } else {
    return Number(input.replace(/[^\d.]+/g, "") * 1000) || 0;
  }
}


/**
 * Parse number from input
 * @param {*} input Any
 * @returns {number}
 */
function parseNumber(input) {
  if (typeof input === "string") return Number(input.replace(/[^\d.]+/g, "")) || 0;
  return Number(input) || 0;
}

/**
 * Check if interaction member can modify queue
 * @param {DJS.Interaction} interaction
 * @returns {boolean}
 */
function modifyQueue(interaction) {
  const memberChannelId = interaction.member?.voice?.channelId;
  const botChannelId = interaction.guild.me?.voice?.channelId;

  if (!memberChannelId) {
    return interaction.client.say.errorMessage(interaction, "You need to join a voice channel first!");
  }

  if (memberChannelId !== botChannelId) {
    return interaction.client.say.wrongMessage(interaction, "You must be in the same voice channel as me!");
  }

  return true;
}

module.exports = {
  sendErrorLog,
  havePermissions,
  toCapitalize,
  formatNumber,
  formatDuration,
  toMilliseconds,
  modifyQueue
};