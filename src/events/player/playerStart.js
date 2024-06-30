import { GuildQueueEvent } from "discord-player";
import embed from "../../modules/playing/embed.js";
import buttons from "../../modules/playing/buttons.js";
import menu from "../../modules/playing/menu.js";

export const data = {
  name: GuildQueueEvent.PlayerStart,
  type: "player",
};

export async function execute(queue, track) {
  try {
    const lastMessage = queue.metadata.message;
    await lastMessage?.delete();
  } catch {
    // ignore
  }

  const newMessage = await queue.metadata.channel.send({
    embeds: [embed(queue, track)],
    components: [menu(queue), ...buttons(queue)],
  });

  queue.metadata.message = newMessage;
}
