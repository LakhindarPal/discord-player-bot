module.exports = {
  name: "tremolo",
  description: "Toggles the tremolo filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      tremolo: !queue.getFiltersEnabled().includes("tremolo")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("tremolo") ? "Applied" : "Removed"} the tremolo filter.`);
  }
};