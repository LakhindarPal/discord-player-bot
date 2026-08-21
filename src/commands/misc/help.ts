import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Need help? Join our support server.");

export const meta: CommandMeta = {
  category: "misc",
};

export function execute(interaction: ChatInputCommandInteraction) {
  const button = new ButtonBuilder()
    .setLabel("Support server")
    .setStyle(ButtonStyle.Link)
    .setURL(process.env.HELP_SERVER_LINK);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  return interaction.reply({
    components: [row],
    content: "** **",
    flags: [MessageFlags.Ephemeral],
  });
}
