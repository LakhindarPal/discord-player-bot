import { GuildQueueEvent } from "discord-player";

export const data = {
  name: GuildQueueEvent.QueueDelete,
  type: "player",
};

export async function execute(queue) {
  try {
    const message = queue.metadata.message;
    await message?.delete();
  } catch {
    // Ignore errors
  }
}
