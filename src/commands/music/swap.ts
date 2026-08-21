import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("swap")
  .setDescription("Swap positions of two tracks in the queue.")
  .addIntegerOption((option) =>
    option
      .setName("first")
      .setDescription("First track position (1-based index).")
      .setRequired(true)
      .setMinValue(1),
  )
  .addIntegerOption((option) =>
    option
      .setName("second")
      .setDescription("Second track position (1-based index).")
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
  if (queue.size < 2) {
    return interaction.reply(replies.error("Need at least 2 tracks to swap."));
  }

  const firstPosition = interaction.options.getInteger("first", true);
  const secondPosition = interaction.options.getInteger("second", true);

  if (firstPosition > queue.size || firstPosition < 1) {
    return interaction.reply(
      replies.warning(
        `Provide a 'first' position between 1 and ${queue.size}.`,
      ),
    );
  }

  if (secondPosition > queue.size || secondPosition < 1) {
    return interaction.reply(
      replies.warning(
        `Provide a 'second' position between 1 and ${queue.size}.`,
      ),
    );
  }

  if (firstPosition === secondPosition) {
    return interaction.reply(
      replies.warning("The two positions cannot be identical."),
    );
  }

  const track1 = queue.tracks.at(firstPosition - 1);
  const track2 = queue.tracks.at(secondPosition - 1);

  if (!track1 || !track2) {
    return interaction.reply(
      replies.error("Could not find tracks at the specified positions."),
    );
  }

  queue.node.swap(firstPosition - 1, secondPosition - 1);
  queue.emit("tracksOrderChange", queue);

  return interaction.reply(
    replies.success(
      `Swapped ${track1.toHyperlink()} with ${track2.toHyperlink()}.`,
    ),
  );
}
