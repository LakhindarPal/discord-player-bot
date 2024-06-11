import { ApplicationCommandOptionType } from "discord.js";
import { BaseEmbed, ErrorEmbed, SuccessEmbed } from "../../modules/Embeds.js";
import { titleCase } from "../../modules/utils.js";
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
export const data = {
  name: "filters",
  description: "Manage audio filters.",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "clear",
      description: "Remove all applied audio filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "status",
      description: "Show the status of all audio filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toggle",
      description: "Enable or disable a specific audio filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name of the filter to toggle.",
          required: true,
          choices: avlFilters.map((filter) => ({
            name: filter,
            value: filter.toLowerCase(),
          })),
        },
      ],
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const subCmd = interaction.options.getSubcommand(true);
  const filters = queue.filters.ffmpeg.getFiltersEnabled();

  switch (subCmd) {
    case "clear": {
      if (!filters.length) {
        return interaction.reply({
          embeds: [ErrorEmbed("No audio filter is currently applied.")],
        });
      }
      queue.filters.ffmpeg.setFilters(false);
      return interaction.reply({
        embeds: [SuccessEmbed("Cleared all applied filters.")],
      });
    }

    case "toggle": {
      const filterName = interaction.options.getString("name", true);
      await interaction.deferReply();
      const mode = await queue.filters.ffmpeg.toggle(filterName);
      return interaction.editReply({
        embeds: [
          SuccessEmbed(
            `${mode ? "Enabled" : "Disabled"} the ${filterName} audio filter.`
          ),
        ],
      });
    }

    default: {
      const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
      const disabledFilters = queue.filters.ffmpeg.getFiltersDisabled();

      const formatFilters = (thatFilters, status) =>
        thatFilters
          .map((filter) => `${titleCase(filter)} --> ${status}`)
          .join("\n");

      const enabledFiltersDesc = formatFilters(enabledFilters, "✅");
      const disabledFiltersDesc = formatFilters(disabledFilters, "❌");

      const embed = BaseEmbed()
        .setTitle("All Filters")
        .setDescription(`${enabledFiltersDesc}\n\n${disabledFiltersDesc}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
}
