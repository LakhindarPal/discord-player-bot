module.exports = {
  name: "stop",
  description: "Stops the playback.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.stop();

    return bot.say.successMessage(interaction, "Stopped the music.");
  }
};