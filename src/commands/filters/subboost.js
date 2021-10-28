module.exports = {
  name: "subboost",
  description: "Toggles the subboost filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      subboost: !queue.getFiltersEnabled().includes("subboost")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("subboost") ? "Applied" : "Removed"} the subboost filter.`);
  }
};