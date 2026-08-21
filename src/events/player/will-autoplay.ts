import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.WillAutoPlay,
  type: "player",
};

export async function execute(
  queue: GuildQueue<QueueMetadata>,
  tracks: Track[],
  done: (track: Track | null) => void,
) {
  const [track] = tracks;
  if (!track) {
    return done(null);
  }

  track.requestedBy = queue.player.client.user;
  return done(track);
}
