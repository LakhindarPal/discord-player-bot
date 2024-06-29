import { GuildQueueEvent } from "discord-player";
import playingEmbed from "../../modules/playingEmbed.js";
import playingButtons from "../../modules/playingButtons.js";

export const data = {
  name: GuildQueueEvent.PlayerResume,
  type: "player",
};

export async function execute(queue) {
  try {
    await queue.metadata.message?.edit({
      embeds: [playingEmbed(queue)],
      components: playingButtons(queue),
    });
  } catch {
    // ignore
  }
}
