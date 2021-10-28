module.exports = {
  name: "mono",
  description: "Toggles the mono filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      mono: !queue.getFiltersEnabled().includes("mono")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("mono") ? "Applied" : "Removed"} the mono filter.`);
  }
};