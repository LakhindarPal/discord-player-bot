module.exports = {
  name: "flanger",
  description: "Toggles the flanger filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      flanger: !queue.getFiltersEnabled().includes("flanger")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("flanger") ? "Applied" : "Removed"} the flanger filter.`);
  }
};