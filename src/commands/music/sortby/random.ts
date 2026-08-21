import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("random")
  .setDescription("Randomly reorder the queue tracks.")
  .addIntegerOption((option) =>
    option
      .setName("start")
      .setDescription("Start queue position (defaults to 1).")
      .setRequired(false)
      .setMinValue(1),
  )
  .addIntegerOption((option) =>
    option
      .setName("end")
      .setDescription("End queue position (defaults to last).")
      .setRequired(false)
      .setMinValue(1),
  );

export const meta: CommandMeta = {
  category: "music",
  parent: "sortby",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.size < 2) {
    return interaction.reply(
      replies.error("Need at least 2 tracks to shuffle."),
    );
  }

  const start = interaction.options.getInteger("start", false) ?? 1;
  const end = interaction.options.getInteger("end", false) ?? queue.size;

  if (start > queue.size) {
    return interaction.reply(
      replies.error(
        `'Start' position should be less than or equal to queue size (${queue.size}).`,
      ),
    );
  }

  if (end < start) {
    return interaction.reply(
      replies.error(
        "'End' position should be greater than or equal to 'Start' position.",
      ),
    );
  }

  if (end > queue.size) {
    return interaction.reply(
      replies.error(
        `'End' position should be less than or equal to queue size (${queue.size}).`,
      ),
    );
  }

  const allTracks = queue.tracks.toArray();
  const slice = allTracks.slice(start - 1, end);

  if (slice.length < 2) {
    return interaction.reply(
      replies.error(
        "Need at least 2 tracks to shuffle in the specified range.",
      ),
    );
  }

  for (let i = slice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = slice[i];
    const target = slice[j];
    if (temp && target) {
      slice[i] = target;
      slice[j] = temp;
    }
  }

  allTracks.splice(start - 1, slice.length, ...slice);
  queue.tracks.clear();
  queue.tracks.add(allTracks);
  queue.emit("tracksOrderChange", queue);

  const isFullQueue = start === 1 && end === queue.size;
  const message = isFullQueue
    ? "Randomly shuffled the queue tracks."
    : `Randomly shuffled \`${slice.length}\` ${pluralize(slice.length, "track")} (#${start}–#${end}).`;

  return interaction.reply(replies.success(message));
}
