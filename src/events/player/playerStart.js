import { GuildQueueEvent } from "discord-player";
import playingEmbed from "../../modules/playingEmbed.js";
import playingButtons from "../../modules/playingButtons.js";

export const data = {
  name: GuildQueueEvent.PlayerStart,
  type: "player",
};
export async function execute(queue, track) {
  try {
    const lastMessageId = queue.metadata.message?.id;
    const lastMessage =
      await queue.metadata.channel.messages?.fetch(lastMessageId);
    await lastMessage?.delete();
  } catch {
    // ignore
  }

  const newMessage = await queue.metadata.channel.send({
    embeds: [playingEmbed(queue, track)],
    components: playingButtons(queue),
  });
  queue.metadata.message = newMessage;
}
