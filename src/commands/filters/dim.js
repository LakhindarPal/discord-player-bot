module.exports = {
  name: "dim",
  description: "Toggles the dim filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      dim: !queue.getFiltersEnabled().includes("dim")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("dim") ? "Applied" : "Removed"} the dim filter.`);
  }
};