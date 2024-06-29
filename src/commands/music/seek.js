import { ApplicationCommandOptionType } from "discord.js";
import { Util } from "discord-player";
import { SuccessEmbed, ErrorEmbed } from "../../modules/Embeds.js";
import { timeToMs } from "../../modules/utils.js";

export const data = {
  name: "seek",
  description: "Seek the player to a specific timestamp.",
  options: [
    {
      name: "timestamp",
      description: "The timestamp to seek to (mm:ss).",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const timestring = interaction.options.getString("timestamp", true);
  const timestamp = timeToMs(timestring);

  if (!queue.currentTrack) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("No song is currently playing.")],
    });
  }

  if (timestamp > queue.currentTrack.durationMS) {
    return interaction.reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(
          `Provide a valid timestamp within 0 and ${queue.currentTrack.duration}.`
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
