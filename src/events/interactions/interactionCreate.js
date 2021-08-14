const { Client, Interaction } = require("discord.js");
const { owners } = require("../../../config.json");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {Client} bot
   * @param {Interaction} interaction
   */
  async execute(bot, interaction) {
    if (!interaction.isCommand()) return;

    await bot.application?.commands.fetch(interaction.commandId).catch(() => null);

    if (!interaction.guildId) return;

    try {
      const command = bot.commands.get(interaction.command?.name ?? "")

      if (!command) return;
      if (!interaction.commandId) return;


      if ((command.category === "botowner" || command.ownerOnly === true) && !owners.includes(interaction?.user.id))
        return bot.say.errorMessage(interaction, "This command can only be used by the bot owners.");

      await command?.execute(bot, interaction);
    } catch (err) {
      bot.say.errorMessage(interaction, "Something went wrong. Sorry for the inconveniences.");
      return bot.utils.sendErrorLog(bot, err, "error");
    }
  }
};