import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = {
  name: "invite",
  description: "Invite the bot to your server",
  category: "misc",
};

export function execute(interaction) {
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=281424481600&scope=bot%20applications.commands`;

  const button = new ButtonBuilder()
    .setLabel("Click to add the bot to your server.")
    .setStyle(ButtonStyle.Link)
    .setURL(inviteLink);

  const row = new ActionRowBuilder().addComponents([button]);

  return interaction.reply({
    ephemeral: true,
    content: "** **",
    components: [row],
  });
}
