import { type GuildQueue, GuildQueueEvent } from "discord-player";
import replies from "#modules/replies";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.Connection,
  type: "player",
};

export function execute(queue: GuildQueue<QueueMetadata>) {
  const textChannel = queue.metadata.channel;

  return textChannel.send(
    replies.info(
      `Joined ${queue.channel?.toString() ?? "Voice Channel"} and bound to ${textChannel.toString()}.`,
    ),
  );
}
