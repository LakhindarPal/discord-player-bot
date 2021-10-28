module.exports = {
  name: "vaporwave",
  description: "Toggles the vaporwave filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vaporwave: !queue.getFiltersEnabled().includes("vaporwave")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vaporwave") ? "Applied" : "Removed"} the vaporwave filter.`);
  }
};