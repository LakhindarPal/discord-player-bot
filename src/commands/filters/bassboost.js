module.exports = {
  name: "bassboost",
  description: "Sets the bassboost filter",
  category: "filters",
  usage: "<level>",
  options: [{
    name: "level",
    description: "Choose the bassboost level",
    type: "STRING",
    required: true,
    choices: [
      {
        name: "Low",
        value: "low"
      },
      {
        name: "Medium",
        value: "medium"
      },
      {
        name: "High",
        value: "high"
      },
      {
        name: "Earrape",
        value: "earrape"
      },
      {
        name: "OFF",
        value: "off"
      }
    ]
  }],
  async execute(bot, interaction) {
    const level = await interaction.options.getString("level", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    let filterName;
    switch (level) {
      case "low":
        filterName = "bassboost_low";
        await queue.setFilters({
          bassboost_low: true
        });
        break;

      case "medium":
        filterName = "bassboost";
        await queue.setFilters({
          bassboost: true
        });
        break;

      case "high":
        filterName = "bassboost_high";
        await queue.setFilters({
          bassboost_high: true
        });
        break;

      case "earrape":
        filterName = "earrape";
        await queue.setFilters({
          earrape: true
        });
        break;

      case "off":
        filterName = "none";
        await queue.setFilters({
          bassboost_low: false,
          bassboost: false,
          bassboost_high: false,
          earrape: false
        });
        break;
    }

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes(`${filterName}`) ? `Bassboost filter level set to \`${level}\`` : "Disabled the bassboost filter"}.`);
  }
};