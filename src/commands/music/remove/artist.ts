import uFuzzy from "@leeoniya/ufuzzy";
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
  .setName("artist")
  .setDescription("Remove all tracks by an artist name.")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Artist name to match.")
      .setRequired(true),
  )
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

const uf = new uFuzzy();

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.isEmpty()) {
    return interaction.reply(replies.error("No upcoming tracks found."));
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

  const artistName = interaction.options.getString("name", true).trim();
  const scopedTracks = queue.tracks.toArray().slice(start - 1, end);
  const authors = scopedTracks.map((track) => track.author);

  const [idxOrder] = uf.search(authors, artistName);

  if (!idxOrder || idxOrder.length === 0) {
    return interaction.reply(
      replies.warning(
        `No tracks by artist "${artistName}" were found in the specified range.`,
      ),
    );
  }

  const matchedTracks = idxOrder
    .map((idx) => scopedTracks[idx])
    .filter((track): track is NonNullable<typeof track> => track !== undefined);

  if (!matchedTracks.length) {
    return interaction.reply(
      replies.warning(
        `No tracks by artist "${artistName}" were found in the specified range.`,
      ),
    );
  }

  return removeModal({
    interaction,
    message: `Removed \`${matchedTracks.length}\` ${pluralize(matchedTracks.length, "track")} by "${artistName}".`,
    onConfirm() {
      const matchedIds = new Set(matchedTracks.map((track) => track.id));
      queue.tracks.remove((track) => matchedIds.has(track.id));
      queue.emit(GuildQueueEvent.AudioTracksRemove, queue, matchedTracks);
    },
    tracks: matchedTracks,
  });
}
