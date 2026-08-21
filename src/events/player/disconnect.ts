import { type GuildQueue, GuildQueueEvent } from "discord-player";
import replies from "#modules/replies";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.Disconnect,
  type: "player",
};

export async function execute(queue: GuildQueue<QueueMetadata>) {
  const reply = replies.info("Looks like my job here is done, leaving now.");

  return queue.metadata?.channel?.send(reply).catch(() => null);
}
