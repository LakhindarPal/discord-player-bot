import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Resume the playback.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (!queue.node.isPaused()) {
    return interaction.reply(replies.error("The playback is not paused."));
  }

  queue.node.resume();

  return interaction.reply(replies.success("Resumed the playback."));
}
