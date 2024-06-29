import { GuildQueueEvent } from "discord-player";

export const data = {
  name: GuildQueueEvent.QueueDelete,
  type: "player",
};
export async function execute(queue) {
  try {
    const messageId = queue.metadata.message?.id;
    const message = await queue.metadata.channel.messages?.fetch(messageId);
    await message?.delete();
  } catch {
    // ignore
  }
}
