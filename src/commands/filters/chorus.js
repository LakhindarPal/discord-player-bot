

module.exports = {
  name: "chorus",
  description: "Sets the chorus filter",
  category: "filters",
  usage: "<level(1d|2d,|3d|off)>",
  options: [{
    name: "level",
    description: "Choose the chorus level",
    type: "STRING",
    required: true,
    choices: [
      {
        name: "1D",
        value: "1d"
      },
      {
        name: "2D",
        value: "2d"
      },
      {
        name: "3D",
        value: "3d"
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
      case "3d":
        filter = "chorus3d";
        await queue.setFilters({
          chorus3d: true
        });
        break;
      case "2d":
        filter = "chorus2d";
        await queue.setFilters({
          chorus2d: true
        });
        break;
      case "1d":
        filter = "chorus";
        await queue.setFilters({
          chorus: true
        });
        break;
      case "off":
        filter = "none";
        await queue.setFilters({
          chorus3d: false,
          chorus2d: false,
          chorus: false
        });
        break;
    }

    return bot.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes(`${filter}`) ? `Chorus filter level set to ${level}` : "Disabled the chorus filter"}.`);
  }
};
