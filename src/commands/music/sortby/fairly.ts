import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type { GuildQueue, Track } from "discord-player";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("fairly")
  .setDescription("Round-robin queue tracks fairly across users.")
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
  if (queue.size < 3) {
    return interaction.reply(
      replies.error("Need at least 3 tracks to sort fairly."),
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

  if (slice.length < 3) {
    return interaction.reply(
      replies.error(
        "Need at least 3 tracks to sort fairly in the specified range.",
      ),
    );
  }

  const tracksByUser = new Map<string, Track[]>();
  for (const track of slice) {
    const key = track.requestedBy?.id ?? "unknown";
    const userTracks = tracksByUser.get(key) ?? [];
    userTracks.push(track);
    tracksByUser.set(key, userTracks);
  }

  const interleaved: Track[] = [];
  let index = 0;
  let hasMore = true;

  while (hasMore) {
    hasMore = false;
    for (const userTracks of tracksByUser.values()) {
      if (index < userTracks.length) {
        const track = userTracks[index];
        if (track) {
          interleaved.push(track);
          hasMore = true;
        }
      }
    }
    index++;
  }

  allTracks.splice(start - 1, slice.length, ...interleaved);
  queue.tracks.clear();
  queue.tracks.add(allTracks);
  queue.emit("tracksOrderChange", queue);

  const isFullQueue = start === 1 && end === queue.size;
  const message = isFullQueue
    ? "Sorted the queue fairly."
    : `Sorted \`${slice.length}\` ${pluralize(slice.length, "track")} fairly (#${start}–#${end}).`;

  return interaction.reply(replies.success(message));
}
