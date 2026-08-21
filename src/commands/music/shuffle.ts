import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("shuffle")
  .setDescription("Toggle queue shuffle mode.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const mode = queue.toggleShuffle();
  queue.emit("shuffleToggle", queue);

  return interaction.reply(
    replies.success(`${mode ? "Enabled" : "Disabled"} shuffle mode.`),
  );
}
