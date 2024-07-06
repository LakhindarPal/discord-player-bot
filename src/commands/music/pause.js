import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "pause",
  description: "Pause the playback",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.node.isPaused()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The playback is already paused.")],
    });
  }

  queue.node.pause();

  return interaction.reply({
    embeds: [SuccessEmbed("Paused the playback.")],
  });
}
