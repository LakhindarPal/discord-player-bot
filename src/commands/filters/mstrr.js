module.exports = {
  name: "mstrr",
  description: "Toggles the mstrr filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    await queue.setFilters({
      mstrr: !queue.getFiltersEnabled().includes("mstrr")
    });

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mstrr") ? "Applied" : "Removed"} the mstrr filter.`);
  }
};