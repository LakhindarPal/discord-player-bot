import {
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
  time,
} from "discord.js";
import { Util } from "discord-player";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("uptime")
  .setDescription("I have been online...");

export const meta: CommandMeta = {
  category: "misc",
};

export function execute(interaction: ChatInputCommandInteraction) {
  const client = interaction.client;
  const upTime = Util.formatDuration(client.uptime ?? 0);
  const upSince = new Date(Date.now() - (client.uptime ?? 0));

  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setAuthor({
      iconURL: client.user?.displayAvatarURL(),
      name: client.user?.tag ?? "Bot",
    })
    .setDescription(
      `**Up Since:** ${time(upSince, "F")}
**Uptime:** ${upTime}`,
    );

  return interaction.reply({
    embeds: [embed],
    flags: [MessageFlags.Ephemeral],
  });
}
