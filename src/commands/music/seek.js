import { ApplicationCommandOptionType } from "discord.js";
import { SuccessEmbed, ErrorEmbed } from "../../modules/Embeds.js";
import { Util } from "discord-player";

export const data = {
  name: "seek",
  description: "Seek to a specific timestamp in the current track.",
  options: [
    {
      name: "timestamp",
      description: "The timestamp to seek to (in seconds).",
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const timestamp = interaction.options.getNumber("timestamp", true) * 1000;

  if (!queue.currentTrack) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no song currently playing.")],
    });
  }

  if (timestamp > queue.currentTrack.durationMS) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(
          `Please provide a valid timestamp within 0 and ${queue.currentTrack.durationMS / 1000}.`
        ),
      ],
    });
  }

  await interaction.deferReply();

  await queue.node.seek(timestamp);

  return interaction.editReply({
    embeds: [SuccessEmbed(`Seeked to ${Util.formatDuration(timestamp)}.`)],
  });
}
