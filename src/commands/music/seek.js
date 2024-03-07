const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "seek",
  description: "Seek the player",
  category: "music",
  options: [
    {
      name: "duration",
      description: "The duration to seek to <mm:ss>",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute(bot, interaction, queue) {
    let timeString = interaction.options.getString("duration", true);

    if (isNaN(timeString) && !timeString.includes(":"))
      return bot.say.errorEmbed(interaction, "Provide a valid duration to seek.");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    const time = bot.utils.toMilliseconds(timeString);

    if (!time || isNaN(time) || time > queue.currentTrack.durationMS || time < 0)
      return bot.say.wrongEmbed(interaction, "Provide a valid duration to seek.");

    queue.node.seek(time);

    return bot.say.successEmbed(interaction, `Seeked to \`${timeString}\`.`);
  },
};
