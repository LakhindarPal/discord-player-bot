import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "voldown",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const level = Math.max(queue.node.volume - 10, 0);

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume decreased to ${level}%.`)],
  });
}
