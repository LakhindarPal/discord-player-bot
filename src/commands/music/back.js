import { useHistory } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "back",
  description: "Go back to the previous song",
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction) {
  const history = useHistory(interaction.guildId);

  if (history.isEmpty())
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no previous song to go back to.")],
    });

  await history.previous();

  return await interaction.reply({
    embeds: [SuccessEmbed("Went back to the previous song.")],
  });
}
