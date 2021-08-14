module.exports = {
  name: "filter",
  description: "Show the current set filters.",
  category: "music",
  subCommands: ["reset**\nResets all filters."],
  options: [{
    name: "reset",
    type: "STRING",
    description: "Reset all filters",
    required: false,
    choices: [{
      name: "Reset",
      value: "reset"
    }]
  }],
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();

    if (!filters.length) return bot.say.warnMessage(interaction, "No filter is applied now.");

    const arg = interaction.options.getString("reset", false);

    if (arg === "reset") {
      await queue.setFilters();
      return bot.say.infoMessage(interaction, "Removed all filters.");
    } else {
      return bot.say.infoMessage(interaction, `\`${filters.map(f=>f)}\` filter is applied now.`);
    }
  }
};