import { ApplicationCommandOptionType } from "discord.js";
import { BaseEmbed, ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";
import ffmpegFilters from "../../config/ffmpegFilters.js";
import { titleCase } from "../../modules/utils.js";

export const data = {
  name: "filters",
  description: "Manage FFmpeg audio filters.",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "disable",
      description: "Disable all active FFmpeg audio filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "status",
      description: "Show the status of all FFmpeg audio filters.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "toggle",
      description: "Enable or disable an FFmpeg audio filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name of the filter to toggle.",
          required: true,
          choices: ffmpegFilters.map((filter) => ({
            name: filter,
            value: filter.toLowerCase(),
          })),
        },
      ],
    },
  ],
  category: "filter",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const subCmd = interaction.options.getSubcommand(true);
  const enabledFilters = queue.filters.ffmpeg.getFiltersEnabled();
  const disabledFilters = queue.filters.ffmpeg.getFiltersDisabled();

  switch (subCmd) {
    case "disable": {
      if (!enabledFilters.length) {
        return interaction.reply({
          ephemeral: true,
          embeds: [ErrorEmbed("No active audio filters found.")],
        });
      }

      queue.filters.ffmpeg.setFilters(false);
      return interaction.reply({
        embeds: [SuccessEmbed("Disabled all active audio filters.")],
      });
    }

    case "toggle": {
      if (!queue.filters.ffmpeg) {
        return interaction.reply({
          ephemeral: true,
          embeds: [
            ErrorEmbed("FFmpeg filters are not available for this song."),
          ],
        });
      }

      const filterName = interaction.options.getString("name", true);
      await interaction.deferReply();
      const mode = await queue.filters.ffmpeg.toggle(filterName);
      return interaction.editReply({
        embeds: [
          SuccessEmbed(
            `${mode ? "Enabled" : "Disabled"} the ${titleCase(filterName)} audio filter.`
          ),
        ],
      });
    }

    default: {
      const formatFilters = (filters, status) =>
        filters
          .map((filter) => `${titleCase(filter)} --> ${status}`)
          .join("\n");

      const enabledFiltersDesc = formatFilters(enabledFilters, "✅");
      const disabledFiltersDesc = formatFilters(disabledFilters, "❌");

      const embed = BaseEmbed()
        .setTitle("FFmpeg Audio Filters")
        .setDescription(`${enabledFiltersDesc}\n\n${disabledFiltersDesc}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
}
