const { supportServer } = require("../../../config.json");

module.exports = {
  name: "support",
  description: "Join the discord support server",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click to join the support server.](${supportServer})`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Server Link")
      .setStyle("LINK")
      .setURL(`${supportServer}`)
    ]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};