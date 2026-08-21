import type { ButtonInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "play_pause",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.node.isPaused()) {
    queue.node.resume();
  } else {
    queue.node.pause();
  }

  return interaction.reply(
    replies.success(
      `${queue.node.isPaused() ? "Paused" : "Resumed"} the playback.`,
      true,
    ),
  );
}
