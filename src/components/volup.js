import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "volup",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const level = Math.min(queue.node.volume + 10, 100);

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume increased to ${level}%.`)],
  });
}
