module.exports = {
  name: "softlimiter",
  description: "Toggles the softlimiter filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      softlimiter: !queue.getFiltersEnabled().includes("softlimiter")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("softlimiter") ? "Applied" : "Removed"} the softlimiter filter.`);
  }
};