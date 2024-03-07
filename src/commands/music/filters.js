/* eslint-disable no-case-declarations */
const { ApplicationCommandOptionType } = require("discord.js");
const avlFilters = [
  "Bassboost",
  "Chorus",
  "Compressor",
  "Dim",
  "Earrape",
  "Expander",
  "Fadein",
  "Flanger",
  "Gate",
  "Haas",
  "Karaoke",
  "Lofi",
  "Mcompand",
  "Mono",
  "Nightcore",
  "Normalizer",
  "Phaser",
  "Pulsator",
  "Reverse",
  "Softlimiter",
  "Subboost",
  "Surrounding",
  "Treble",
  "Vaporwave",
  "Vibrato",
];

module.exports = {
  name: "filters",
  description: "Audio filters commands",
  category: "music",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "clear",
      description: "Clear all applied filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "show",
      description: "Show all filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toggle",
      description: "Toggle a audio filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name of the filter",
          required: true,
          choices: avlFilters.map((f) => ({
            name: `${f}`,
            value: `${f.toLowerCase()}`,
          })),
        },
      ],
    },
  ],
  async execute(bot, interaction, queue) {
    const subCmd = await interaction.options.getSubcommand(true);

    const filters = queue.filters.ffmpeg.getFiltersEnabled();

    switch (subCmd) {
      case "clear":
        if (!filters.length)
          return bot.say.errorEmbed(interaction, "No audio filter is applied currently.");

        queue.filters.ffmpeg.setFilters(false);

        await bot.say.successEmbed(interaction, "Cleared all audio filters.");
        break;

      case "toggle":
        const filterName = interaction.options.getString("name", true);
        queue.filters.ffmpeg.toggle(filterName);

        await bot.say.successEmbed(interaction, `Toggle the ${filterName} audio filter`);
        break;

      default:
        const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
        const disabledFilters = queue.filters.ffmpeg.getFiltersDisabled();

        const enFDes = enabledFilters.map((f) => `${f} --> ✅`).join("\n");

        const disFDes = disabledFilters.map((f) => `${f} --> ❌`).join("\n");
        const embed = bot.utils
          .baseEmbed(interaction)
          .setTitle("All Audio Filters")
          .setDescription(`${enFDes}\n\n${disFDes}`);

        await interaction.reply({ ephemeral: true, embeds: [embed] });
        break;
    }
  },
};
