module.exports = {
  name: "treble",
  description: "Toggles the treble filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      treble: !queue.getFiltersEnabled().includes("treble")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("treble") ? "Applied" : "Removed"} the treble filter.`);
  }
};