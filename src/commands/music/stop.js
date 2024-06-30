import { SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "stop",
  description: "Stop the playback.",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  queue.node.stop();

  return interaction.reply({
    embeds: [SuccessEmbed("Stopped the playback.")],
  });
}
