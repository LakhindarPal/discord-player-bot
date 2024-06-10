import { ApplicationCommandOptionType } from "discord.js";
import { ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "skipto",
  description: "Skip to the given song, removing others on the way",
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: "position",
      description: "The position of the song to skip to",
      min_value: 1,
      required: true,
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
      embeds: [ErrorEmbed("The queue has no song to skip to.")],
    });

  const position = interaction.options.getNumber("position", true) - 1;

  if (position >= queue.size)
    interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The provided position is not valid.")],
    });

  queue.node.skipTo(position);

  return interaction.reply({
    embeds: [SuccessEmbed(`Skipped to song ${position + 1}.`)],
  });
}
