import type { ButtonInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "shuffle",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.isEmpty()) {
    return interaction.reply(replies.error("No upcoming tracks found."));
  }

  const mode = queue.toggleShuffle();
  queue.emit("shuffleToggle", queue);

  return interaction.reply(
    replies.success(`${mode ? "Enabled" : "Disabled"} shuffle mode.`, true),
  );
}
