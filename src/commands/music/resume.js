import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "resume",
  description: "Resume the playback",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.node.isPlaying()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The playback is not paused.")],
    });
  }

  queue.node.resume();

  return interaction.reply({
    embeds: [SuccessEmbed("Resumed the playback.")],
  });
}
