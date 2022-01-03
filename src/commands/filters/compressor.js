module.exports = {
  name: "compressor",
  description: "Toggles the compressor filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      compressor: !queue.getFiltersEnabled().includes("compressor")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("compressor") ? "Applied" : "Removed"} the compressor filter.`);
  }
};