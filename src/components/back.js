import { useHistory } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "back",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction) {
  const history = useHistory(interaction.guildId);

  if (history.isEmpty()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no previous song to go back.")],
    });
  }

  await interaction.deferReply();

  await history.previous();

  return interaction.editReply({
    embeds: [SuccessEmbed("Went back to the previous song.")],
  });
}
