import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = {
  name: "help",
  description: "Join the support server and get some help",
  category: "misc",
};

export function execute(interaction) {
  const button = new ButtonBuilder()
    .setLabel("Need help? Join our support server.")
    .setStyle(ButtonStyle.Link)
    .setURL(
      process.env.SUPPORT_SERVER ||
        "https://github.com/LakhindarPal/discord-player-bot"
    );

  const row = new ActionRowBuilder().addComponents([button]);

  return interaction.reply({
    ephemeral: true,
    content: "** **",
    components: [row],
  });
}
