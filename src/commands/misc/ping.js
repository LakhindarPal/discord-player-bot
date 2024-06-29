import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: "ping",
  description: "Ping? Pong!",
  category: "misc",
};

export async function execute(interaction) {
  const embed1 = BaseEmbed().setDescription("Pinging...");

  await interaction
    .reply({ ephemeral: true, embeds: [embed1] })
    .catch(console.error);

  const embed2 = BaseEmbed()
    .setTitle("🏓 Pong")
    .setDescription(
      `💓: ${interaction.client.ws.ping.toFixed(0)} ms
⏱️: ${Date.now() - interaction.createdTimestamp} ms`
    );

  return interaction.editReply({ embeds: [embed2] }).catch(console.error);
}
