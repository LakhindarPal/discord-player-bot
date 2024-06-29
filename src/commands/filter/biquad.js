import { ApplicationCommandOptionType } from "discord.js";
import { BiquadFilterType } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "biquad",
  description: "Manage biquad filters.",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "disable",
      description: "Disable the biquad filter.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "set",
      description: "Apply a specific biquad audio filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "preset",
          description: "The name of the preset to apply.",
          required: true,
          choices: Object.keys(BiquadFilterType).map((filter) => ({
            name: filter,
            value: filter,
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
  const subcmd = interaction.options.getSubcommand(true);

  if (!queue.filters.biquad)
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Biquad filter is not available for this song.")],
    });

  if (subcmd === "disable") {
    queue.filters.biquad.disable();
    return interaction.reply({
      embeds: [SuccessEmbed("Disabled the biquad filter.")],
    });
  } else {
    const preset = interaction.options.getString("preset", true);
    queue.filters.biquad.setFilter(BiquadFilterType[preset]);
    return interaction.reply({
      embeds: [SuccessEmbed(`Biquad filter set to ${preset}.`)],
    });
  }
}
