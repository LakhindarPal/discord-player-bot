import { ApplicationCommandOptionType } from "discord.js";
import { useHistory } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "clear",
  description: "Clear songs from the queue, history, or all.",
  options: [
    {
      name: "type",
      description: "Select the type of songs to clear.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "Queue", value: "queue" },
        { name: "History", value: "history" },
        { name: "All", value: "all" },
      ],
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const type = interaction.options.getString("type");
  const history = useHistory(interaction.guildId);

  if ((type === "queue" || type === "both") && queue.isEmpty()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The queue is empty.")],
    });
  }
  if ((type === "history" || type === "both") && history.isEmpty()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("The history is empty.")],
    });
  }

  switch (type) {
    case "queue":
      queue.tracks.clear();
      break;
    case "history":
      history.clear();
      break;
    default:
      queue.clear();
      break;
  }

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `Cleared ${type === "all" ? "all the" : `the ${type}`} tracks.`
      ),
    ],
  });
}
