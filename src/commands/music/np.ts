import {
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("np")
  .setDescription("View the currently playing track.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const track = queue.currentTrack;
  if (!track) return;

  const progressBar = queue.node.createProgressBar();
  const description = `Requested by: ${track.requestedBy?.toString() ?? "Unknown"}${progressBar ? `\n\n${progressBar}` : ""}`;

  const embed = new EmbedBuilder()
    .setAuthor({ name: "Now Playing" })
    .setTitle(track.title)
    .setURL(track.url)
    .setThumbnail(track.thumbnail)
    .setDescription(description)
    .setColor(Colors.Blurple);

  return interaction.reply({
    embeds: [embed],
    flags: [MessageFlags.Ephemeral],
  });
}
