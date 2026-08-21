import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { type GuildQueue, GuildQueueEvent } from "discord-player";
import { removeModal } from "#modules/remove-modal";
import replies from "#modules/replies";
import { pluralize, timeToMs } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("duration")
  .setDescription("Remove tracks based on duration comparison.")
  .addStringOption((option) =>
    option
      .setName("duration")
      .setDescription("Duration timestamp (mm:ss).")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("filter")
      .setDescription("Duration comparison filter.")
      .setRequired(true)
      .addChoices(
        { name: "Longer than (>)", value: "longer" },
        { name: "Shorter than (<)", value: "shorter" },
        { name: "Equal to (=)", value: "equal" },
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

  const durationStr = interaction.options.getString("duration", true);
  const filter = interaction.options.getString("filter", true);
  const targetMs = timeToMs(durationStr);

  if (targetMs === null || targetMs <= 0) {
    return interaction.reply(
      replies.error("Provide a valid duration (e.g. 3:30 or 1:15:00)."),
    );
  }

  const scopedTracks = queue.tracks.toArray().slice(start - 1, end);
  const matchedTracks = scopedTracks.filter((track) => {
    if (filter === "longer") {
      return track.durationMS > targetMs;
    }
    if (filter === "shorter") {
      return track.durationMS < targetMs;
    }
    return Math.floor(track.durationMS / 1000) === Math.floor(targetMs / 1000);
  });

  if (!matchedTracks.length) {
    return interaction.reply(
      replies.warning(
        "No tracks matched the duration filter in the specified range.",
      ),
    );
  }

  const labelMap: Record<string, string> = {
    equal: "equal to",
    longer: "longer than",
    shorter: "shorter than",
  };
  const filterLabel = labelMap[filter] ?? filter;

  return removeModal({
    interaction,
    message: `Removed \`${matchedTracks.length}\` ${pluralize(matchedTracks.length, "track")} ${filterLabel} ${durationStr}.`,
    onConfirm() {
      const matchedIds = new Set(matchedTracks.map((track) => track.id));
      queue.tracks.remove((track) => matchedIds.has(track.id));
      queue.emit(GuildQueueEvent.AudioTracksRemove, queue, matchedTracks);
    },
    tracks: matchedTracks,
  });
}
