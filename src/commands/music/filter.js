module.exports = {
  name: "filter",
  description: "Filters commands",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "reset",
      description: "Reset all applied filters."
    },
    {
      type: "SUB_COMMAND",
      name: "show",
      description: "Shows all filters."
    }
  ],
  async execute(bot, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();


    if (subCmd === "reset") {
      if (!filters.length)
        return bot.say.warnMessage(interaction, "No filter is applied now.");

      queue.setFilters({});

      return bot.say.successMessage(interaction, "Removed all applied filters.");
      
    } else {
      const enabledFilters = queue.getFiltersDisabled();
      const disabledFilters = queue.getFiltersDisabled();

      const enFDes = enabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ✅`).join("\n");

      const disFDes = disabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ❌`).join("\n");

      const embed = bot.say.baseEmbed(interaction)
        .setTitle("All Audio Filters")
        .setDescription(`${enFDes}\n\n${disFDes}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
};