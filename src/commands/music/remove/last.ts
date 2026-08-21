import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { type GuildQueue, GuildQueueEvent } from "discord-player";
import { removeModal } from "#modules/remove-modal";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("last")
  .setDescription("Remove the most recently added track.")
  .addIntegerOption((option) =>
    option
      .setName("count")
      .setDescription("Number of tracks to remove.")
      .setRequired(false)
      .setMinValue(1),
  );

export const meta: CommandMeta = {
  category: "music",
  parent: "remove",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.isEmpty()) {
    return interaction.reply(replies.error("No upcoming tracks found."));
  }

  const count = interaction.options.getInteger("count", false) ?? 1;

  if (count > queue.size) {
    return interaction.reply(
      replies.error(
        `Queue only has ${queue.size} ${pluralize(queue.size, "track")}.`,
      ),
    );
  }

  const targetTracks = queue.tracks.toArray().slice(-count);

  return removeModal({
    interaction,
    message: `Removed the last \`${count}\` ${pluralize(count, "track")}.`,
    onConfirm() {
      const targetIds = new Set(targetTracks.map((t) => t.id));
      queue.tracks.remove((t) => targetIds.has(t.id));
      queue.emit(GuildQueueEvent.AudioTracksRemove, queue, targetTracks);
    },
    tracks: targetTracks,
  });
}
