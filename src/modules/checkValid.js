const config = require("../../config.json");
const logger = require("./logger");

function checkValid() {
  if (!process.env["DISCORD_BOT_TOKEN"]) {
    throw Error("[ERROR][BOT]: DISCORD_BOT_TOKEN is must required");
  }
  /**
  if (!process.env["MONGO_DB_URI"]) {
    throw Error("[ERROR][BOT]: MONGO_DB_URI is required");
  }
*/
  if (!config.botInviteLink || config.botInviteLink === "") {
    logger.warn("config", "botInviteLink is required to invite the bot");
  }

  if (!config.supportServerLink || config.supportServerLink === "") {
    logger.warn("config", "supportServerLink is required for discord support");
  }

  if (!config.devGuildId) {
    logger.error("config", "devGuilId is required to register dev only commands");
  }

  if (!config.botDevIds[0]) {
    logger.error("config", "botDevIds are required for developer only commands");
  }

  if (!config.logChannelId || config.logChannelId === "") {
    logger.error(
      "config",
      "logChannelId is required for reporting any errors (if none is provided, the bot will only log errors in the console)"
    );
  }
}

checkValid();
