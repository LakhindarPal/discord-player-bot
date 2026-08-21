import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
  time,
  version,
} from "discord.js";
import { Util } from "discord-player";
import { inviteUrl, localeNumber } from "#modules/utils";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Get some information about me.");

export const meta: CommandMeta = {
  category: "misc",
};

export function execute(interaction: ChatInputCommandInteraction) {
  const client = interaction.client;
  const guilds = client.guilds;

  const userCount = localeNumber(
    guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
    interaction.guildLocale || interaction.locale,
  );
  const serverCount = localeNumber(
    guilds.cache.size,
    interaction.guildLocale || interaction.locale,
  );
  const channelCount = localeNumber(
    guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0),
    interaction.guildLocale || interaction.locale,
  );
  const commandCount = client.commands.size;
  const uptime = Util.formatDuration(client.uptime ?? 0);
  const createdAt = new Date(client.user?.createdAt ?? Date.now());
  const inviteLink = inviteUrl(interaction.client);

  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setAuthor({
      iconURL: client.user?.displayAvatarURL(),
      name: client.user?.username ?? "Bot",
    })
    .addFields([
      {
        name: "General Info",
        value: `ID: ${client.user?.id}
Tag: ${client.user?.tag}
Created At: ${time(createdAt, "F")}
Developer: [LakhindarPal](https://lakhindar.dev)
Prefix: /`,
      },
      {
        name: "My Stats",
        value: `Users: ${userCount}
Servers: ${serverCount}
Channels: ${channelCount}
Commands: ${commandCount}`,
      },
      {
        name: "System Info",
        value: `RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
Uptime: ${uptime}
Runtime: Bun v${typeof Bun !== "undefined" ? Bun.version : process.version}
Discord.js: v${version}
Platform: ${process.platform}`,
      },
    ]);

  const helpBtn = new ButtonBuilder()
    .setLabel("Help")
    .setStyle(ButtonStyle.Link)
    .setURL(process.env.HELP_SERVER_LINK);

  const inviteBtn = new ButtonBuilder()
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setURL(inviteLink);

  const codeBtn = new ButtonBuilder()
    .setLabel("Code")
    .setStyle(ButtonStyle.Link)
    .setURL("https://github.com/LakhindarPal/discord-player-bot");

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    helpBtn,
    inviteBtn,
    codeBtn,
  );

  return interaction.reply({
    components: [row],
    embeds: [embed],
    flags: [MessageFlags.Ephemeral],
  });
}
