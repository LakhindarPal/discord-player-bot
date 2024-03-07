/* eslint-disable no-case-declarations */
const { ApplicationCommandOptionType } = require("discord.js");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "repeat",
  description: "Set repeat mode for the queue",
  category: "music",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "show",
      description: "Show current repeat mode status.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "off",
      description: "Default mode with no loop active",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "queue",
      description: "Loop the current queue",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "track",
      description: "Repeat the current track",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "autoplay",
      description: "Play related songs automatically based on your existing queue",
    },
  ],
  async execute(bot, interaction, queue) {
    const subCmd = await interaction.options.getSubcommand(true);

    let description;
    switch (subCmd) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        description = "Turned off repeat mode.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        description = "Looping the current track.";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        description = "Looing the current queue.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        description = "Autoplay mode activated.";
        break;
      // case "show":
      default:
        let status = "none";
        if (queue.repeatMode === 3) {
          status = "autoplay";
        } else if (queue.repeatMode === 2) {
          status = "queue";
        } else if (queue.repeatMode === 1) {
          status = "track";
        } else if (queue.repeatMode === 0) {
          status = "off";
        }

        const embed = bot.utils
          .baseEmbed(interaction)
          .setDescription(`Playback repeat status: \`${status}\`.`)
          .setFooter({ text: `Use '/repeat <off|track|queue|autoplay>' to change repeat mode.` });

        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    return interaction.reply({
      embeds: [bot.utils.baseEmbed(interaction).setDescription(description)],
    });
  },
};
