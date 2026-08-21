import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, useHistory } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("previous")
  .setDescription("Skip to the previous track.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export async function execute(
  interaction: ChatInputCommandInteraction,
  _queue: GuildQueue<QueueMetadata>,
) {
  const history = useHistory();

  if (history?.isEmpty()) {
    return interaction.reply(replies.error("No played tracks found."));
  }

  await interaction.deferReply();

  await history?.previous();

  return interaction.editReply(
    replies.success("Skipped to the previous track.", false),
  );
}
