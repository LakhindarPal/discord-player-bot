import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, QueueRepeatMode } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("next")
  .setDescription("Skip to the next track.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.isEmpty() && queue.repeatMode !== QueueRepeatMode.AUTOPLAY) {
    return interaction.reply(replies.error("No upcoming tracks found."));
  }

  queue.node.skip();

  return interaction.reply(replies.success("Skipped to the next track."));
}
