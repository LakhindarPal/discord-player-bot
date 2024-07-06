import { SuccessEmbed, WarningEmbed } from "../modules/embeds.js";

export const data = {
  id: "volup",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.node.volume === 100) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("Volume is already at maximum.")],
    });
  }

  const level = Math.min(queue.node.volume + 10, 100);

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume increased to ${level}%.`)],
  });
}
