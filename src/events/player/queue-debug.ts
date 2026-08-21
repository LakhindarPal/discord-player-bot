import { type GuildQueue, GuildQueueEvent } from "discord-player";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.Debug,
  type: "player",
};

export async function execute(
  _queue: GuildQueue<QueueMetadata>,
  message: string,
) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}
