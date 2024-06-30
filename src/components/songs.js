import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "songs_menu",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const index = Number(interaction.values[0]);

  queue.node.jump(index);

  return interaction.reply({
    embeds: [SuccessEmbed(`Jumped to the ${index + 1} song.`)],
  });
}
