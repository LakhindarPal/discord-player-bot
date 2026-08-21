import {
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping? Pong!");

export const meta: CommandMeta = {
  category: "misc",
};

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setDescription("Pinging...");

  await interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });

  embed.setTitle("🏓 Pong").setDescription(
    `💓: ${interaction.client.ws.ping.toFixed(0)} ms
⏱️: ${Date.now() - interaction.createdTimestamp} ms`,
  );

  return interaction.editReply({ embeds: [embed] });
}
