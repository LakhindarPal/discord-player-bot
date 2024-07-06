import { ApplicationCommandOptionType } from "discord.js";
import { useHistory } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "clear",
  description: "Clear songs from the queue, history, or all.",
  options: [
    {
      name: "queue",
      description: "Clear songs from the queue.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "history",
      description: "Clear songs from the history.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "all",
      description: "Clear all songs from the queue and history.",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const subcmd = interaction.options.getSubcommand();
  const history = useHistory(interaction.guildId);

  switch (subcmd) {
    case "queue":
      if (queue.isEmpty()) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("The queue is already empty.")],
        });
      }
      queue.tracks.clear();
      break;

    case "history":
      if (history.isEmpty()) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("The history is already empty.")],
        });
      }
      history.clear();
      break;

    default:
      if (history.isEmpty() && history.isEmpty()) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("Both queue and history is already empty.")],
        });
      }
      queue.clear();
      break;
  }

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `Cleared ${subcmd === "all" ? "all the" : `the ${subcmd}`} tracks.`
      ),
    ],
  });
}
