import type { ButtonInteraction } from "discord.js";
import type { GuildQueue, QueueRepeatMode } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "repeat",
  queueOnly: true,
  sameVC: true,
};

const messages = [
  "Disabled repeat mode.",
  "Repeating the current track.",
  "Repeating the entire queue.",
  "Activated autoplay mode.",
] as const;

export function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const newMode = ((queue.repeatMode + 1) % messages.length) as QueueRepeatMode;

  queue.setRepeatMode(newMode);
  queue.emit("repeatChange", queue);

  return interaction.reply(replies.success(messages[newMode], true));
}
