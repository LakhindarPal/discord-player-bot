module.exports = {
  name: "expander",
  description: "Toggles the expander filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      expander: !queue.getFiltersEnabled().includes("expander")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("expander") ? "Applied" : "Removed"} the expander filter.`);
  }
};