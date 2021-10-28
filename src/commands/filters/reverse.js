module.exports = {
  name: "reverse",
  description: "Toggles the reverse filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      reverse: !queue.getFiltersEnabled().includes("reverse")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("reverse") ? "Applied" : "Removed"} the reverse filter.`);
  }
};