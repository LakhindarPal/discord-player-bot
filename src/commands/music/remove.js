import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "remove",
  description: "Remove a song from the queue",
  options: [
    {
      name: "position",
      description: "The position of the song to remove",
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
  if (queue.isEmpty())
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The queue is empty.")],
    });

  const index = interaction.options.getNumber("position", true) - 1;

  if (index >= queue.size)
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The provided position is not valid.")],
    });

  const removed = queue.node.remove(index);

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `Removed [${removed.title}](${removed.url}) from the queue.`
      ),
    ],
  });
}
