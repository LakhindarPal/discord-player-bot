module.exports = {
  name: "bassboost",
  description: "Sets the bassboost filter",
  category: "filters",
  usage: "<level(low|medium|high|earrape|off)>",
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
    const level = interaction.options.getString("level", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    let filter;
    switch (level) {
      case "low":
        filter = "bassboost_low";
        await queue.setFilters({
          bassboost_low: true
        });
        break;
      case "medium":
        filter = "bassboost";
        await queue.setFilters({
          bassboost: true
        });
        break;
      case "high":
        filter = "bassboost_high";
        await queue.setFilters({
          bassboost_high: true
        });
        break;
      case "earrape":
        filter = "earrape";
        await queue.setFilters({
          earrape: true
        });
        break;
      case "off":
        filter = "none";
        await queue.setFilters({
          bassboost_low: false,
          bassboost: false,
          bassboost_high: false,
          earrape: false
        });
        break;
    }

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes(`${filter}`) ? `Bassboost filter level set to ${level}` : "Disabled the bassboost filter"}.`);
  }
};