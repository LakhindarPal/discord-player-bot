const config = require("../../../config.json");
const { version, time, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "Get some info about the bot",
  category: "misc",
  async execute(bot, interaction) {
    const format = bot.utils.formatNumber;

    const serverCount = format(bot.guilds.cache.size);
    const channelCount = format(bot.guilds.cache.size);
    const userCount = format(bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0));
    const commandCount = format(bot.commands.size);

    const createdAt = new Date(bot.user.createdAt);
    const uptime = bot.utils.formatDuration(Math.floor(bot.uptime / 1000));

    const embed = bot.utils
      .baseEmbed(interaction)
      .setAuthor({
        name: `${bot.user.username}’s Info`,
        iconURL: bot.user.displayAvatarURL(),
      })
      .addFields([
        {
          name: "General Info",
          value: `Bot Id: ${bot.user.id}
Bot Tag: ${bot.user.tag}
Created At : ${time(createdAt, "F")}
Developer: [L0SER#8228](https://l0ser.is-a.dev)
Prefix: /`,
        },
        {
          name: "Bot Stats",
          value: `Users: ${userCount}
Servers: ${serverCount}
Channels: ${channelCount}
Commands: ${commandCount}`,
        },
        {
          name: "System Info",
          value: `RAM Usage:  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
Bot Uptime: ${uptime}
Node Version: ${process.version}
Discord.js Version: ${version}
Platform: ${process.platform}`,
        },
      ]);

    const supportButton = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(`${config.supportServerLink}`);

    const inviteButton = new ButtonBuilder()
      .setLabel("Invite")
      .setStyle(ButtonStyle.Link)
      .setURL(`${config.botInviteLink}`);

    const buttonsRow = new ActionRowBuilder().addComponents([supportButton, inviteButton]);

    return interaction.reply({
      ephemeral: true,
      embeds: [embed],
      components: [buttonsRow],
    });
  },
};
