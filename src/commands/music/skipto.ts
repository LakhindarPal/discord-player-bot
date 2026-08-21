import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("skipto")
  .setDescription("Skip to a track, removing all preceding tracks.")
  .addIntegerOption((option) =>
    option
      .setName("position")
      .setDescription("Track queue position (1-based index).")
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
  if (queue.isEmpty()) {
    return interaction.reply(replies.error("No upcoming tracks found."));
  }

  const position = interaction.options.getInteger("position", true);

  if (position > queue.size || position < 1) {
    return interaction.reply(
      replies.error(`Provide a number between 1 and ${queue.size}.`),
    );
  }

  queue.node.skipTo(position - 1);

  return interaction.reply(replies.success(`Skipped to track #${position}.`));
}
