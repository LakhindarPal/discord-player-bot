const { time } = require("discord.js");

module.exports = {
  name: "uptime",
  description: "Return the uptime of the bot",
  category: "misc",
  execute(bot, interaction) {
    const upTime = bot.utils.formatDuration(Math.floor(bot.uptime / 1000));

    const upSince = new Date(Date.now() - bot.uptime);

    const embed = bot.utils.baseEmbed(interaction).setAuthor({
      name: `${bot.user.username}’s Uptime`,
      iconURL: bot.user.displayAvatarURL(),
    }).setDescription(`**Up since:** ${time(upSince, "F")}
**Time:** ${upTime}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  },
};
