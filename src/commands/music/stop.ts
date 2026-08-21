import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stop the playback.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  queue.node.stop();

  return interaction.reply(replies.success("Stopped the playback."));
}
