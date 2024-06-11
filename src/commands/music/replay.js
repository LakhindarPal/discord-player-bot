import { ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "replay",
  description: "Replay the current song from the beginning",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (!queue.currentTrack) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no song currently playing.")],
    });
  }

  queue.node.seek(0);

  return interaction.reply({
    embeds: [SuccessEmbed("Replaying the current song.")],
  });
}
