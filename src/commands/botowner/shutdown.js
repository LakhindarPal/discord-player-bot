module.exports = {
  name: "shutdown",
  description: "Shuts the bot down",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, interaction) {

    await bot.say.infoMessage(interaction, "Shutting the bot down.....");
    process.exit(1);
  }
};