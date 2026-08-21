import type { ButtonInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "stop",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  queue.node.stop();

  return interaction.reply(replies.success("Stopped the playback."));
}
