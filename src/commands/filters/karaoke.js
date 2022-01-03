module.exports = {
  name: "kakaoke",
  description: "Toggles the kakaoke filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      kakaoke: !queue.getFiltersEnabled().includes("kakaoke")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("kakaoke") ? "Applied" : "Removed"} the kakaoke filter.`);
  }
};