import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import updatePlayingUi from "#modules/playing/update";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.AudioTrackAdd,
  type: "player",
};

export async function execute(
  queue: GuildQueue<QueueMetadata>,
  _track: Track<unknown>,
) {
  if (!queue.size) return;
  await updatePlayingUi(queue);
}
