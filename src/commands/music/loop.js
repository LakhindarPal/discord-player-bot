const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "loop",
  description: "Shows current set loop mode",
  category: "music",
  subCommands: ["queue**\nLoop the queue.", "track**\nRepeat the current playing song.", "off**\nTurn looping off.", "autoplay**\nToogle autoplay mode on/off."],
  options: [{
    name: "mode",
    type: "STRING",
    description: "Choose the new loop mode to change",
    required: false,
    choices: [
      {
        name: "Off",
        value: "off"
      },
      {
        name: "Track",
        value: "track"
       },
      {
        name: "Queue",
        value: "queue"
      },
      {
        name: "Autoplay",
        value: "autoplay"
       }
     ]
  }],
  async execute(bot, interaction) {
    const arg = interaction.options.getString("mode", false);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    let md = "none";
    if (queue.repeatMode === 3) {
      md = "autoplay";
    } else if (queue.repeatMode == 2) {
      md = "queue";
    } else if (queue.repeatMode == 1) {
      md = "track";
    } else if (queue.repeatMode == 0) {
      md = "off";
    }

    const embed = bot.say.rootEmbed(interaction)
      .setDescription(`Loop mode is set to: \`${md}\`.`)
      .setFooter(`Use \'\/loop <off|track|queue|autoplay>\' to change loop mode.`);

    if (!arg)
      return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

    let mode;
    switch (arg) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "Turned off loop mode.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "Repeating track activated";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "Looping queue enabled.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "Autoplay mode activated.";
        break;
      default:
        return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
    }

    return bot.say.infoMessage(interaction, `${mode}`);
  }
};
