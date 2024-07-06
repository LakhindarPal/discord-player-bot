import { ApplicationCommandOptionType } from "discord.js";
import {
  ErrorEmbed,
  SuccessEmbed,
  WarningEmbed,
} from "../../modules/embeds.js";

export const data = {
  name: "move",
  description: "Move a song in the queue",
  options: [
    {
      name: "from",
      description: "The current position of the song",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
    {
      name: "to",
      description: "The new position to move to",
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
  if (queue.size < 2) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Not enough songs in the queue to move.")],
    });
  }

  const from = interaction.options.getNumber("from", true) - 1;
  const to = interaction.options.getNumber("to", true) - 1;

  if (from >= queue.size) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The `from` position is not valid.")],
    });
  }

  if (to >= queue.size) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The `to` position is not valid.")],
    });
  }

  if (from === to) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("The song is already in this position.")],
    });
  }

  const track = queue.tracks.at(from);
  queue.node.move(from, to);

  return interaction.reply({
    embeds: [SuccessEmbed(`Moved \`${track.title}\` to position ${to + 1}.`)],
  });
}
