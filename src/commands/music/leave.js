import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "leave",
  description: "Leave the voice channel.",
  category: "music",
  validateVC: true,
};

export function execute(interaction, queue) {
  if (!queue) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("I am not playing anything right now!")],
    });
  }

  if (!queue.deleted) queue.delete();

  return interaction.reply({
    embeds: [SuccessEmbed("Left the voice channel.")],
  });
}
