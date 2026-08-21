import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, useHistory } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Clear tracks from the queue or history.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("queue")
      .setDescription("Clear all the upcoming tracks."),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("history")
      .setDescription("Clear all the played tracks."),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("all").setDescription("Clear all the tracks."),
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
  const subcmd = interaction.options.getSubcommand();
  const history = useHistory();

  switch (subcmd) {
    case "queue":
      if (queue.isEmpty()) {
        return interaction.reply(replies.error("No upcoming tracks found."));
      }
      queue.tracks.clear();
      queue.emit("tracksOrderChange", queue);
      return interaction.reply(
        replies.success("Cleared all tracks from the queue."),
      );

    case "history":
      if (history?.isEmpty()) {
        return interaction.reply(replies.error("No played tracks found."));
      }
      history?.clear();
      return interaction.reply(
        replies.success("Cleared all tracks from history."),
      );

    default:
      if (queue.isEmpty() && history?.isEmpty()) {
        return interaction.reply(
          replies.error("Both the queue and history are empty."),
        );
      }
      queue.clear();
      queue.emit("tracksOrderChange", queue);
      return interaction.reply(
        replies.success("Cleared all tracks from the queue and history."),
      );
  }
}
