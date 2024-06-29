import {
  version,
  time,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Util } from "discord-player";
import { formatNumber } from "../../modules/utils.js";
import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: "info",
  description: "Show info about the bot",
  category: "misc",
};

export function execute(interaction) {
  const client = interaction.client;
  const { guilds, commands } = client;
  const userCount = formatNumber(
    guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
  );
  const serverCount = formatNumber(guilds.cache.size);
  const channelCount = formatNumber(
    guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)
  );
  const commandCount = commands.size;
  const uptime = Util.formatDuration(client.uptime);
  const createdAt = new Date(client.user.createdAt);
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;

  const embed = BaseEmbed()
    .setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL(),
    })
    .addFields([
      {
        name: "General Info",
        value: `Bot Id: ${client.user.id}
Bot Tag: ${client.user.tag}
Created At : ${time(createdAt, "F")}
Developer: [LakhindarPal](https://lakhindar.is-a.dev)
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
    .setURL(
      process.env.SUPPORT_SERVER ||
        "https://github.com/LakhindarPal/discord-player-bot"
    );

  const inviteButton = new ButtonBuilder()
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setURL(inviteLink);

  const gitrepoButton = new ButtonBuilder()
    .setLabel("Source Code")
    .setStyle(ButtonStyle.Link)
    .setURL("https://github.com/LakhindarPal/discord-player-bot");

  const buttonsRow = new ActionRowBuilder().addComponents([
    supportButton,
    inviteButton,
    gitrepoButton,
  ]);

  return interaction.reply({
    ephemeral: true,
    embeds: [embed],
    components: [buttonsRow],
  });
}
