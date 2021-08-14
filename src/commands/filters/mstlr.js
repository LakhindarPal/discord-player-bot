module.exports = {
  name: "mstlr",
  description: "Toggles the mstlr filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      mstlr: !queue.getFiltersEnabled().includes("mstlr")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mstlr") ? "Applied" : "Removed"} the mstlr filter.`);
  }
};