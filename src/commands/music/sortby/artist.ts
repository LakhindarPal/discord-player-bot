import uFuzzy from "@leeoniya/ufuzzy";
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
  .setName("artist")
  .setDescription("Sort queue alphabetically by artist name.")
  .addStringOption((option) =>
    option
      .setName("order")
      .setDescription("Alphabetical sort order.")
      .setRequired(true)
      .addChoices(
        { name: "A to Z (Ascending)", value: "ascending" },
        { name: "Z to A (Descending)", value: "descending" },
      ),
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
  parent: "sortby",
  queueOnly: true,
  sameVC: true,
};

const uf = new uFuzzy();

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.size < 2) {
    return interaction.reply(replies.error("Need at least 2 tracks to sort."));
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

  const order = interaction.options.getString("order", true);
  const allTracks = queue.tracks.toArray();
  const slice = allTracks.slice(start - 1, end);

  if (slice.length < 2) {
    return interaction.reply(
      replies.error("Need at least 2 tracks to sort in the specified range."),
    );
  }

  const clusters: { canonicalName: string; tracks: Track[] }[] = [];

  for (const track of slice) {
    const clusterNames = clusters.map((c) => c.canonicalName);
    const [idxOrder] = uf.search(clusterNames, track.author);

    if (idxOrder && idxOrder.length > 0 && idxOrder[0] !== undefined) {
      const matchedCluster = clusters[idxOrder[0]];
      if (matchedCluster) {
        matchedCluster.tracks.push(track);
        continue;
      }
    }

    let matched = false;
    for (const cluster of clusters) {
      const [reverseMatch] = uf.search([track.author], cluster.canonicalName);
      if (reverseMatch && reverseMatch.length > 0) {
        cluster.tracks.push(track);
        matched = true;
        break;
      }
    }

    if (!matched) {
      clusters.push({
        canonicalName: track.author,
        tracks: [track],
      });
    }
  }

  if (order === "ascending") {
    clusters.sort((a, b) => a.canonicalName.localeCompare(b.canonicalName));
  } else {
    clusters.sort((a, b) => b.canonicalName.localeCompare(a.canonicalName));
  }

  const sortedSlice = clusters.flatMap((c) => c.tracks);
  allTracks.splice(start - 1, slice.length, ...sortedSlice);
  queue.tracks.clear();
  queue.tracks.add(allTracks);
  queue.emit("tracksOrderChange", queue);

  const orderLabel = order === "ascending" ? "A to Z" : "Z to A";
  const isFullQueue = start === 1 && end === queue.size;
  const message = isFullQueue
    ? `Sorted the queue by artist (${orderLabel}).`
    : `Sorted \`${slice.length}\` ${pluralize(slice.length, "track")} by artist (${orderLabel}) (#${start}–#${end}).`;

  return interaction.reply(replies.success(message));
}
