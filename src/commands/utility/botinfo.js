const config = require("../../../config.json");
const { version } = require("discord.js");
const os = require("os");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "utility",
  async execute(bot, interaction) {
    const util = bot.utils;
    const uptime = moment.duration(bot.uptime)
      .format(" D [Days], H [Hours], m [Minutes], s [Seconds]");
    const nodev = process.version;
    const createdAt = new Date(bot.user.createdAt);
    const users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    const core = os.cpus()[0];

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`${bot.user.username}’s Information`, bot.user.displayAvatarURL())
      .addField("__**General Info**__",
        `**Bot Id:** ${bot.user.id}
**Bot Tag:** ${bot.user.tag}
**Created At :** ${createdAt.toDateString()}
**Developer: [L0SER#8228](https:\/\/l0ser.is-a.dev)**
**Global Prefix:** ${bot.user.toString()} (@${bot.user.tag})`
      )
      .addField("__**Bot Stats:**__",
        `**Users:** ${util.formatNumber(users)}
**Servers:** ${util.formatNumber(bot.guilds.cache.size)}
**Channels:** ${util.formatNumber(bot.channels.cache.size)}
**Command Count:** ${util.formatNumber(bot.commands.size)}`
      )
      .addField("__**System Info**__",
        `**RAM Usage:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
**Total Memory:** ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
**Bot Uptime:** ${uptime}
**Node Version:** ${nodev}
**Discord.js Version:** ${version}`
      )
      .addField("__**Hosting Info**__",
        `**Cores:** ${os.cpus().length}
**Model:** ${core.model}
**Speed:** ${core.speed} MHz
**Arch:** ${os.arch()}
**Platform:** ${util.toCapitalize(process.platform)}`
      )
      .addField("** **",
        `[Support](${config.supportServer}) |  [top.gg](https:\/\/top.gg\/bot\/${bot.user.id}) | [Invite](${config.inviteLink})`
      );

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};
