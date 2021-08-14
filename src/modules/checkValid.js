const config = require("../../config.json");
const logger = require("../modules/Logger");

function checkValid() {
  const v = parseFloat(process.versions.node);

  if (v < 16) {
    throw Error("[ERROR]: This bot requires version 16 of nodejs! Please upgrade to version 16");
  }

  if (!config.botToken || config.botToken === "") {
    throw Error("[ERROR][BOT]: botToken must be required.");
  }

  if (!config.inviteLink || config.inviteLink === "") {
    logger.warn("bot", "nviteLink is required to invite the bot.");
  }

  if (!config.supportServer || config.supportServer === "") {
    logger.warn("bot", "supportServer is required for discord support.");
  }

  if (!config.owners[0]) {
    logger.warn("bot", "ownerId is required for bot-owner only commands.");
  }

  if (!config.errorLogsChannel || config.errorLogsChannel === "") {
    logger.warn(
      "bot",
      "errorLogsChannel is required for reporting any errors (if none is provided, the bot will only log errors in the console)"
    );
  }
}

module.exports = checkValid;
