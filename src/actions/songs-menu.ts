import type { StringSelectMenuInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "songs_menu",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: StringSelectMenuInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const value = interaction.values[0];
  if (!value) return;

  const index = Number.parseInt(value, 10);
  if (Number.isNaN(index) || index >= queue.size) {
    return interaction.reply(replies.warning("Invalid track is selected."));
  }

  queue.node.jump(index);

  return interaction.reply(replies.success(`Jumped to track #${index + 1}.`));
}
