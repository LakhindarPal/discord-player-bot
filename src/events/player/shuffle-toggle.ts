import type { GuildQueue } from "discord-player";
import updatePlayingUi from "#modules/playing/update";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: "shuffleToggle",
  type: "player",
};

export async function execute(queue: GuildQueue<QueueMetadata>) {
  await updatePlayingUi(queue);
}
