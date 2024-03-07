const DJS = require("discord.js");

/**
 * logs error through discord webhook
 * @param {DJS.Client} bot
 * @param {DJS.DiscordAPIError|HTTPError|Error|unknown} error
 * @param {"warning" | "error"} type
 * @returns {Promise<void>}
 */
async function sendErrorLog(bot, error, type) {
  try {
    if (error.message?.includes("Missing Access")) return;
    if (error.message?.includes("Unknown Message")) return;
    if (error.message?.includes("Unknown interaction")) return;

    if (
      error.stack?.includes("TypeError: Cannot read properties of undefined (reading 'messages')")
    ) {
      return bot.logger.error("ERR_LOG", error);
    }

    const { logChannelId } = require("../../config.json");
    if (!logChannelId) return bot.logger.error("ERR_LOG", error?.stack || `${error}`);

    const channel =
      bot.channels.cache.get(logChannelId) || (await bot.channels.fetch(logChannelId));

    if (!channel || !havePermissions(channel)) {
      return bot.logger.error("ERR_LOG", error?.stack || `${error}`);
    }

    const code = "code" in error ? error.code : "N/A";
    const httpStatus = "httpStatus" in error ? error.httpStatus : "N/A";
    const requestData = "requestData" in error ? error.requestData : { json: {} };

    const name = error.name || "N/A";
    let stack = error.stack || error;
    let jsonString = "";

    try {
      jsonString = JSON.stringify(requestData.json, null, 2);
    } catch {
      jsonString = "";
    }

    if (jsonString?.length > 2048) {
      jsonString = jsonString ? `${jsonString?.slice(0, 2045)}...` : "";
    }

    if (typeof stack === "string" && stack.length > 2048) {
      console.error(stack);
      stack = "An error occurred but was too long to send to Discord, check your console.";
    }

    const embed = new DJS.EmbedBuilder()
      .setTitle("An error occurred")
      .addFields(
        { name: "Name", value: name, inline: true },
        {
          name: "Code",
          value: code.toString(),
          inline: true,
        },
        {
          name: "httpStatus",
          value: httpStatus.toString(),
          inline: true,
        },
        {
          name: "Timestamp",
          value: bot.logger.now,
          inline: true,
        },
        {
          name: "Request data",
          value: DJS.codeBlock(jsonString.slice(0, 2045)),
          inline: false,
        }
      )
      .setDescription(DJS.codeBlock(stack))
      .setColor(type === "error" ? DJS.Colors.Red : DJS.Colors.Orange);

    await channel.send({ embeds: [embed] });
  } catch (e) {
    console.error({ error });
    console.error(e);
  }
}

/**
 * check if the bot has the default permissions
 * @param {DJS.CommandInteraction | DJS.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
  const channel = "channel" in resolveable ? resolveable.channel : resolveable;
  const permissions = channel.permissionsFor(resolveable.guild.members.me);
  return (
    permissions?.has(DJS.PermissionsBitField.Flags.ViewChannel) &&
    permissions?.has(DJS.PermissionsBitField.Flags.SendMessages) &&
    permissions?.has(DJS.PermissionsBitField.Flags.EmbedLinks)
  );
}

/**
 * format a number to local string
 * @param {number | string} n
 * @returns {string}
 */
function formatNumber(n) {
  return Number.parseFloat(String(n)).toLocaleString("en-IN");
}

/**
 * format duration to string
 * @param {number} millisec Duration in milliseconds
 * @returns {string}
 */
function formatDuration(millisec) {
  if (!millisec || !Number(millisec)) return "0 Second";
  const seconds = Math.round((millisec % (60 * 1000)) / 1000);
  const minutes = Math.floor((millisec % (60 * 60 * 1000)) / (60 * 1000));
  const hours = Math.floor(millisec / (60 * 60 * 1000));

  if (hours > 0) return `${hours} Hour, ${minutes} Minute & ${seconds} Second`;
  if (minutes > 0) return `${minutes} Minute & ${seconds} Second`;
  return `${seconds} Second`;
}

/**
 * convert formatted duration to milliseconds
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
  }
  return Number(input.replace(/[^\d.]+/g, "") * 1000) || 0;
}

/**
 * returns a custom embed with colour
 * @param {DJS.CommandInteraction|string|object|null} resolvable
 */
function baseEmbed(resolvable) {
  let colour = DJS.Colors.Fuchsia;

  if (resolvable && typeof resolvable === "number") colour = resolvable;
  if (resolvable && typeof resolvable === "object")
    colour =
      ("guild" in resolvable ? resolvable.guild : resolvable)?.members.me.displayColor ||
      DJS.Colors.Fuchsia;

  return new DJS.EmbedBuilder().setColor(colour);
}

module.exports = {
  sendErrorLog,
  havePermissions,
  formatNumber,
  formatDuration,
  toMilliseconds,
  baseEmbed,
};
