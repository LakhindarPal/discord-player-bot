import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, Util } from "discord-player";
import replies from "#modules/replies";
import { timeToMs } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("seek")
  .setDescription("Seek to a timestamp in current track.")
  .addStringOption((option) =>
    option
      .setName("timestamp")
      .setDescription("Timestamp as mm:ss (e.g. 1:30 or 45).")
      .setRequired(true),
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
  const timestring = interaction.options.getString("timestamp", true);
  const timestamp = timeToMs(timestring);
  const track = queue.currentTrack;
  if (!track) return;

  if (timestamp === null || timestamp > track.durationMS || timestamp < 0) {
    return interaction.reply(
      replies.error(
        `Provide a valid timestamp between 00:00 and ${track.duration}.`,
      ),
    );
  }

  queue.node.seek(timestamp);

  return interaction.reply(
    replies.success(`Seeked to ${Util.formatDuration(timestamp)}.`),
  );
}
