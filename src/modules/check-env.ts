function checkEnv() {
  const required = [
    "DISCORD_BOT_TOKEN",
    "DEV_USER_IDS",
    "BOT_CLIENT_ID",
    "DEV_GUILD_ID",
    "HELP_SERVER_LINK",
  ];

  for (const envVar of required) {
    if (!process.env[envVar]) {
      throw new Error(
        `[ENV]: '${envVar}' is missing. The bot will not function properly without it.`,
      );
    }
  }
}

checkEnv();
