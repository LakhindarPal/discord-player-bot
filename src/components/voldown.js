import { SuccessEmbed, WarningEmbed } from "../modules/embeds.js";

export const data = {
  id: "voldown",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.node.volume === 0) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("Volume is already at minimum.")],
    });
  }

  const level = Math.max(queue.node.volume - 10, 0);

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume decreased to ${level}%.`)],
  });
}
