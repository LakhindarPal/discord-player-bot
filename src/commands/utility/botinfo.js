const config = require("../../../config.json");
const { version: djsVersion, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "utility",
  async execute(bot, interaction) {
    const util = bot.utils;
    const uptime = util.formatDuration(bot.uptime);
    const createdAt = new Date(bot.user.createdAt);
    const users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor({ name: `${bot.user.username}’s Information`, iconURL: bot.user.displayAvatarURL() })
      .addField("General Info",
        `**Bot Id:** ${bot.user.id}
**Bot Tag:** ${bot.user.tag}
**Created At :** ${createdAt.toDateString()}
**Developer: [L0SER#8228](https:\/\/l0ser.is-a.dev)**
**Prefix:** \/`
      )
      .addField("Bot Stats",
        `**Users:** ${util.formatNumber(users)}
**Servers:** ${util.formatNumber(bot.guilds.cache.size)}
**Channels:** ${util.formatNumber(bot.channels.cache.size)}
**Command Count:** ${util.formatNumber(bot.commands.size)}`
      )
      .addField("System Info",
        `**RAM Usage:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
**Bot Uptime:** ${uptime}
**Node Version:** ${process.version}
**Discord.js Version:** ${djsVersion}
**Platform:** ${util.toCapitalize(process.platform)}`
      );

    const button1 = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);

    const button2 = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`${config.inviteLink}`);

    const row = new MessageActionRow().addComponents([button1, button2]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};