module.exports = {
  name: "gate",
  description: "Toggles the gate filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      gate: !queue.getFiltersEnabled().includes("gate")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("gate") ? "Applied" : "Removed"} the gate filter.`);
  }
};