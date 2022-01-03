module.exports = {
  name: "phaser",
  description: "Toggles the phaser filter.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      phaser: !queue.getFiltersEnabled().includes("phaser")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("phaser") ? "Applied" : "Removed"} the phaser filter.`);
  }
};