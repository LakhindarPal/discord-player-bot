import { type GuildQueue, GuildQueueEvent } from "discord-player";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.QueueDelete,
  type: "player",
};

export async function execute(queue: GuildQueue<QueueMetadata>) {
  try {
    const message = queue.metadata.message;
    await message?.delete();
  } catch {
    // Ignore errors
  }
}
