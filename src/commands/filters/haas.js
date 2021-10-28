module.exports = {
  name: "haas",
  description: "Toggles the haas filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      haas: !queue.getFiltersEnabled().includes("haas")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("haas") ? "Applied" : "Removed"} the haas filter.`);
  }
};