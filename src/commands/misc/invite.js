const { botInviteLink } = require("../../../config.json");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite the bot to your server",
  category: "misc",
  execute(bot, interaction) {
    const button = new ButtonBuilder()
      .setLabel("Click to add this bot to your server.")
      .setStyle(ButtonStyle.Link)
      .setURL(`${botInviteLink}`);

    const row = new ActionRowBuilder().addComponents([button]);

    return interaction.reply({
      ephemeral: true,
      content: "** **",
      components: [row],
    });
  },
};
