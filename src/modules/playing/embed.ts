import { Colors, EmbedBuilder } from "discord.js";
import type { GuildQueue, Track } from "discord-player";
import icons from "#constants/source-icons";
import type { QueueMetadata } from "#types/event";

export default function embed(
  queue: GuildQueue<QueueMetadata>,
  currentTrack?: Track<unknown>,
): EmbedBuilder {
  const track = currentTrack ?? queue.currentTrack;
  if (!track) return new EmbedBuilder();

  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setAuthor({
      iconURL:
        (icons as Record<string, string>)[track.source] ??
        queue.player.client.user?.displayAvatarURL(),
      name: `Now ${queue.node.isPaused() ? "Paused" : "Playing"}`,
    })
    .setDescription(
      `${track.toHyperlink()} ~ [${track.requestedBy?.toString() ?? "Unknown"}]`,
    )
    .setImage(
      track.thumbnail ||
        "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );

  const progress = queue.node.createProgressBar({ timecodes: true });
  if (progress) {
    embed.setFooter({ text: progress });
  }

  return embed;
}
