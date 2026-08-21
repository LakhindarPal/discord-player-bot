import { type GuildQueue, GuildQueueEvent } from "discord-player";
import replies from "#modules/replies";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.EmptyQueue,
  type: "player",
};

export async function execute(queue: GuildQueue<QueueMetadata>) {
  const reply = replies.info("No tracks are left to play.");

  return queue.metadata?.channel?.send(reply).catch(() => null);
}
