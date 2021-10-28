module.exports = {
  name: "pause",
  description: "Pauses the current playing song.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.connection.paused)
      return bot.say.warnMessage(interaction, "The song is already paused.");

    queue.setPaused(true);

    return bot.say.successMessage(interaction, "Paused the current song.");
  }
};