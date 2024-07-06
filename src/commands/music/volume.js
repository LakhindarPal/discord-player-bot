import { ApplicationCommandOptionType } from "discord.js";
import { SuccessEmbed, InfoEmbed } from "../../modules/embeds.js";

export const data = {
  name: "volume",
  description: "Adjust the volume of the music player.",
  options: [
    {
      name: "level",
      description: "The volume level to set (0-100).",
      type: ApplicationCommandOptionType.Number,
      required: false,
      min_value: 0,
      max_value: 100,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const level = interaction.options.getNumber("level", false);

  if (!level) {
    return interaction.reply({
      ephemeral: true,
      embeds: [InfoEmbed(`Current volume level is: ${queue.node.volume}%.`)],
    });
  }

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume has been set to ${level}%.`)],
  });
}
