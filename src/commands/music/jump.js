import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "jump",
  description: "Jump to specific song on the queue without removing others",
  options: [
    {
      name: "position",
      description: "The position of the song to jump to",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  category: "music",
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

  const position = interaction.options.getNumber("position", true);

  if (position > queue.size) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The provided position is not valid.")],
    });
  }

  queue.node.jump(position - 1);

  return interaction.reply({
    embeds: [SuccessEmbed(`Jumped to the ${position} song.`)],
  });
}
