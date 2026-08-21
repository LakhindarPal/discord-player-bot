import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import updatePlayingUi from "#modules/playing/update";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.AudioTracksRemove,
  type: "player",
};

export async function execute(
  queue: GuildQueue<QueueMetadata>,
  _tracks: Track<unknown>[],
) {
  await updatePlayingUi(queue);
}
