import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "shuffle",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.isEmpty()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The queue is empty.")],
    });
  }

  const mode = queue.toggleShuffle();

  // emit custom event
  queue.emit("shuffleToggle", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(`${mode ? "Enabled" : "Disabled"} shuffle mode.`)],
  });
}
