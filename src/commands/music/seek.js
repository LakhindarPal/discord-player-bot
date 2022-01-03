module.exports = {
  name: "seek",
  description: "Seeks to a specific position in the current song.",
  usage: "<mm:ss>",
  category: "music",
  options: [{
    name: "duration",
    description: "The duration to seek <mm:ss>",
    type: "STRING",
    required: true
  }],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const song = queue.current;

    if (song.live)
      return bot.say.wrongMessage(interaction, "Can't seek this live streaming song.");

    let timeString = interaction.options.getString("duration", true);

    if (isNaN(timeString) && !timeString.includes(":"))
      return bot.say.errorMessage(interaction, "Provide a valid duration to seek.");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    const time = bot.utils.toMilliseconds(timeString);

    if (!time || isNaN(time) || time > song.durationMS || time < 0)
      return bot.say.wrongMessage(interaction, "Provide a valid duration to seek.");

    queue.seek(time);

    return bot.say.successMessage(interaction, `Seeked to \`${timeString}\`.`);
  }
};