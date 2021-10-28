module.exports = {
  name: "shutdown",
  description: "Shuts the bot down",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, interaction) {
    await bot.say.successMessage(interaction, "Shutting the bot down.....", true);

    process.exit(1);
  }
};