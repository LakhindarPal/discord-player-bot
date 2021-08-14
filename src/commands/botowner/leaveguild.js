module.exports = {
  name: "leaveguild",
  description: "Leaves a guid by the Id",
  category: "botowner",
  ownerOnly: true,
  usage: "guildId",
  options: [{
    name: "guild",
    description: "The ID of the guild to leave",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    try {
      const id = interaction.options.getString("guild", true);

      const guild = bot.guilds.cache.find((g) => g.id === id);

      if (!guild)
        return bot.say.warnMessage(interaction, `No guild was found with that id \`${id}\`.`);

      await guild.leave();
      return bot.say.infoMessage(interaction, `Left **${guild.name}** guild with id \`${id}\`.`);
    } catch (err) {
      bot.utils.sendErrorLog(bot, err, "error");
      return bot.say.errorMessage(interaction, "An error occurred.");
    }
  }
};
