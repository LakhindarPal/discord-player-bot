import { GuildQueueEvent } from "discord-player";

export const data = {
  name: GuildQueueEvent.WillAutoPlay,
  type: "player",
};

export function execute(queue, tracks, done) {
  const [track] = tracks;
  const client = queue.player.client;
  track.requestedBy = client.user;

  done(track);
}
