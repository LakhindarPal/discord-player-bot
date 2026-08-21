import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import { removeModal } from "#modules/remove-modal";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("duplicate")
  .setDescription("Remove all duplicate tracks.")
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
  parent: "remove",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.size < 2) {
    return interaction.reply(
      replies.error("Need at least 2 tracks to check for duplicates."),
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

  const scopedTracks = queue.tracks.toArray().slice(start - 1, end);
  if (scopedTracks.length < 2) {
    return interaction.reply(
      replies.warning("The specified range contains fewer than 2 tracks."),
    );
  }

  const seenUrls = new Set<string>();
  const duplicateTracks: Track[] = [];

  for (const track of scopedTracks) {
    if (seenUrls.has(track.url)) {
      duplicateTracks.push(track);
    } else {
      seenUrls.add(track.url);
    }
  }

  if (!duplicateTracks.length) {
    return interaction.reply(
      replies.warning("No duplicate tracks were found in the specified range."),
    );
  }

  const duplicateIds = new Set(duplicateTracks.map((track) => track.id));

  return removeModal({
    interaction,
    message: `Removed \`${duplicateTracks.length}\` duplicate ${pluralize(duplicateTracks.length, "track")}.`,
    onConfirm() {
      queue.tracks.remove((track) => duplicateIds.has(track.id));
      queue.emit(GuildQueueEvent.AudioTracksRemove, queue, duplicateTracks);
    },
    tracks: duplicateTracks,
  });
}
