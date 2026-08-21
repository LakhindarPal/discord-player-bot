import type { ButtonInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "mute",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const currentVolume = queue.node.volume;

  if (currentVolume > 0) {
    queue.metadata.previousVolume = currentVolume;
    queue.node.setVolume(0);
    return interaction.reply(replies.success("Muted the player.", true));
  }

  const restoreVolume =
    queue.metadata.previousVolume && queue.metadata.previousVolume > 0
      ? queue.metadata.previousVolume
      : 100;

  queue.node.setVolume(restoreVolume);

  return interaction.reply(
    replies.success(`Unmuted the player (Volume: ${restoreVolume}%).`, true),
  );
}
