import { ApplicationCommandOptionType } from "discord.js";
import { EqualizerConfigurationPreset } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../../modules/embeds.js";

export const data = {
  name: "equalizer",
  description: "Manage equalizer filters.",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "disable",
      description: "Disable the equalizer filter.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "set",
      description: "Set an equalizer filter.",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "preset",
          description: "The name of the preset to apply.",
          required: true,
          choices: Object.keys(EqualizerConfigurationPreset).map((filter) => ({
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
  const subCmd = interaction.options.getSubcommand(true);

  if (!queue.filters.equalizer)
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("Equalizer filter is not available for this song.")],
    });

  if (subCmd === "disable") {
    queue.filters.equalizer.disable();
    return interaction.reply({
      embeds: [SuccessEmbed("Disabled the equalizer filter.")],
    });
  } else {
    const preset = interaction.options.getString("preset", true);
    queue.filters.equalizer.setEQ(EqualizerConfigurationPreset[preset]);
    return interaction.reply({
      embeds: [SuccessEmbed(`Equalizer filter set to ${preset}.`)],
    });
  }
}
