const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(bot) {
    // initializing commands
    require("../../handlers/Command")(bot);

    const format = bot.utils.formatNumber;
    const serverCount = format(bot.guilds.cache.size);
    const userCount = format(bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0));

    const statuses = [
      {
        name: `${serverCount} servers & ${userCount} users`,
        type: ActivityType.Watching,
      },
      { name: "/play", type: ActivityType.Listening },
      { name: "/help", type: ActivityType.Playing },
    ];

    const data = `${bot.user.tag} is ready in ${serverCount} servers.`;

    bot.logger.info("BOT_READY", data);

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status.name, { type: status.type });
    }, 60000);
  },
};
