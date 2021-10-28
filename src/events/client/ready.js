module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    //initializing commands
    require("../../handler/CommandHandler")(bot);

    const formatNum = bot.utils.formatNumber;

    const serverCount = formatNum(bot.guilds.cache.size);
    const channelCount = formatNum(bot.channels.cache.size);
    const userCount = formatNum(
      bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );

    const statuses = [
      { "name": `${serverCount} servers & ${userCount} users and ${channelCount} channels`, "type": "WATCHING" },
      { "name": "\/play", "type": "LISTENING" },
      { "name": "\/help", "type": "PLAYING" }
    ];

    const data = `${bot.user.tag} is running with ${serverCount} servers, ${channelCount} channels and ${userCount} users`;

    bot.logger.info("BOT_READY", data);

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status.name, { type: status.type });
    }, 60000);
  }
};