import {
  type ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import { removeModal } from "#modules/remove-modal";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("track")
  .setDescription("Remove a track by its queue position.")
  .addIntegerOption((option) =>
    option
      .setName("position")
      .setDescription("Track position in queue (1-based index).")
      .setRequired(true)
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

  const position = interaction.options.getInteger("position", true);

  if (position > queue.size || position < 1) {
    return interaction.reply(
      replies.error(`Provide a number between 1 and ${queue.size}.`),
    );
  }

  const track = queue.tracks.at(position - 1);
  if (!track) {
    return interaction.reply(
      replies.error("The selected track was not found."),
    );
  }

  return removeModal({
    interaction,
    message: `Removed track #${position}: ${track.toHyperlink()}.`,
    onConfirm() {
      queue.node.remove(position - 1);
    },
    tracks: [track],
  });
}
