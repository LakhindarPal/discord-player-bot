import { GuildQueueEvent } from "discord-player";
import embed from "../../modules/playing/embed.js";
import buttons from "../../modules/playing/buttons.js";
import menu from "../../modules/playing/menu.js";

export const data = {
  name: GuildQueueEvent.PlayerResume,
  type: "player",
};

export async function execute(queue) {
  try {
    const components = [menu(queue), ...buttons(queue)].filter(Boolean);
    await queue.metadata.message?.edit({
      embeds: [embed(queue)],
      components,
    });
  } catch {
    // Ignore errors
  }
}
