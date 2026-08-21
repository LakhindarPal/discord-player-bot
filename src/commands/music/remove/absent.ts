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
  .setName("absent")
  .setDescription("Remove tracks requested by absent users.")
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

  const voiceChannel = queue.channel;
  if (!voiceChannel) {
    return interaction.reply(
      replies.error("The voice channel is unavailable."),
    );
  }

  const channelMembers = voiceChannel.members;
  const scopedTracks = queue.tracks.toArray().slice(start - 1, end);
  const absentTracks = scopedTracks.filter(
    (track) =>
      track.requestedBy != null && !channelMembers.has(track.requestedBy.id),
  );

  if (!absentTracks.length) {
    return interaction.reply(
      replies.warning(
        "No tracks from absent users were found in the specified range.",
      ),
    );
  }

  return removeModal({
    interaction,
    message: `Removed \`${absentTracks.length}\` ${pluralize(absentTracks.length, "track")} from absent users.`,
    onConfirm() {
      const absentIds = new Set(absentTracks.map((track) => track.id));
      queue.tracks.remove((track) => absentIds.has(track.id));
      queue.emit(GuildQueueEvent.AudioTracksRemove, queue, absentTracks);
    },
    tracks: absentTracks,
  });
}
