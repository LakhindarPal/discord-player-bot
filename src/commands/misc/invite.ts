import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { inviteUrl } from "#modules/utils";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("invite")
  .setDescription("Invite me to your server.");

export const meta: CommandMeta = {
  category: "misc",
};

export function execute(interaction: ChatInputCommandInteraction) {
  const button = new ButtonBuilder()
    .setLabel("Add me")
    .setStyle(ButtonStyle.Link)
    .setURL(inviteUrl(interaction.client));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  return interaction.reply({
    components: [row],
    content: "** **",
    flags: [MessageFlags.Ephemeral],
  });
}
