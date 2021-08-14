const { supportServer } = require("../../../config.json");

module.exports = {
  name: "support",
  description: "Get the support server link",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.rootEmbed(interaction)
      .setTitle("__**Need help? Join our support server.**__")
      .setURL(supportServer);

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};