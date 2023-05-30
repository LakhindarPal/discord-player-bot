const { supportServerLink } = require("../../../config.json");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "support",
  description: "Join the support server and get some help",
  category: "misc",
  execute(bot, interaction) {
    const button = new ButtonBuilder()
      .setLabel("Need help? Join our support server.")
      .setStyle(ButtonStyle.Link)
      .setURL(`${supportServerLink}`);

    const row = new ActionRowBuilder().addComponents([button]);

    return interaction.reply({
      ephemeral: true,
      content: "** **",
      components: [row],
    });
  },
};
