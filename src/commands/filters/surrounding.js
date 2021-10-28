module.exports = {
  name: "surrounding",
  description: "Toggles the surrounding filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      surrounding: !queue.getFiltersEnabled().includes("surrounding")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("surrounding") ? "Applied" : "Removed"} the surrounding filter.`);
  }
};