import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "stop",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  queue.node.stop();

  return interaction.reply({
    embeds: [SuccessEmbed("Stopped the playback.")],
  });
}
