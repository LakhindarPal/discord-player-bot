module.exports = {
  name: "vibrato",
  description: "Toggles the vibrato filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vibrato: !queue.getFiltersEnabled().includes("vibrato")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vibrato") ? "Applied" : "Removed"} the vibrato filter.`);
  }
};