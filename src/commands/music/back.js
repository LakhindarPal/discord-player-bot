module.exports = {
  name: "back",
  description: "Backs to the previous song",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    if (queue.previousTracks.length <= 1)
      return bot.say.warnMessage(interaction, "No previous track was found.");

    queue.back();

    return bot.say.infoMessage(interaction, "Backed to the previous song.");
  }
};