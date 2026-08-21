import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("move")
  .setDescription("Move a track to a new queue position.")
  .addIntegerOption((option) =>
    option
      .setName("from")
      .setDescription("Current queue position (1-based index).")
      .setRequired(true)
      .setMinValue(1),
  )
  .addIntegerOption((option) =>
    option
      .setName("to")
      .setDescription("Target queue position (1-based index).")
      .setRequired(true)
      .setMinValue(1),
  );

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.size < 2) {
    return interaction.reply(replies.error("Need at least 2 tracks to move."));
  }

  const fromPosition = interaction.options.getInteger("from", true);
  const toPosition = interaction.options.getInteger("to", true);

  if (fromPosition > queue.size || fromPosition < 1) {
    return interaction.reply(
      replies.warning(`Provide a 'from' position between 1 and ${queue.size}.`),
    );
  }

  if (toPosition > queue.size || toPosition < 1) {
    return interaction.reply(
      replies.warning(`Provide a 'to' position between 1 and ${queue.size}.`),
    );
  }

  if (fromPosition === toPosition) {
    return interaction.reply(
      replies.warning("The track is already at that position."),
    );
  }

  const track = queue.tracks.at(fromPosition - 1);
  if (!track) {
    return interaction.reply(replies.error("No track found at that position."));
  }

  queue.node.move(fromPosition - 1, toPosition - 1);
  queue.emit("tracksOrderChange", queue);

  return interaction.reply(
    replies.success(`Moved ${track.toHyperlink()} to #${toPosition}.`),
  );
}
