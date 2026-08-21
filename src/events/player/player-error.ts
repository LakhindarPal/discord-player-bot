import { Colors, codeBlock, EmbedBuilder } from "discord.js";
import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.PlayerError,
  type: "player",
};

export async function execute(
  queue: GuildQueue<QueueMetadata>,
  error: Error,
  _track: Track<unknown>,
) {
  console.error(error);

  const embed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle("Player Error")
    .setDescription(codeBlock(error.message));

  return queue.metadata?.channel
    ?.send({ embeds: [embed] })
    .catch(console.error);
}
