import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "play",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.node.isPaused()) {
    queue.node.resume();
  } else {
    queue.node.pause();
  }

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `${queue.node.isPaused() ? "Paused" : "Resumed"} the playback.`
      ),
    ],
  });
}
