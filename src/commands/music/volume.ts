import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("volume")
  .setDescription("Set the playback volume.")
  .addIntegerOption((option) =>
    option
      .setName("level")
      .setDescription("Volume level (0-100).")
      .setRequired(false)
      .setMinValue(0)
      .setMaxValue(100),
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
  const level = interaction.options.getInteger("level", false);

  if (level === null) {
    return interaction.reply(
      replies.info(`The current volume is ${queue.node.volume}%.`, true),
    );
  }

  queue.node.setVolume(level);

  return interaction.reply(replies.success(`Volume set to ${level}%.`));
}
