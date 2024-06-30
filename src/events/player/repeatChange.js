import embed from "../../modules/playing/embed.js";
import buttons from "../../modules/playing/buttons.js";

export const data = {
  name: "repeatChange",
  type: "player",
};

export async function execute(queue) {
  try {
    await queue.metadata.message?.edit({
      embeds: [embed(queue)],
      components: buttons(queue),
    });
  } catch {
    // ignore
  }
}
