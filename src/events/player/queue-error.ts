import { Colors, codeBlock, EmbedBuilder } from "discord.js";
import { type GuildQueue, GuildQueueEvent } from "discord-player";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.Error,
  type: "player",
};

export async function execute(queue: GuildQueue<QueueMetadata>, error: Error) {
  console.error(error);
  const embed = new EmbedBuilder()
    .setColor(Colors.Red)
    .setTitle("Queue Error")
    .setDescription(codeBlock(error.message));

  return queue.metadata?.channel
    ?.send({ embeds: [embed] })
    .catch(console.error);
}
