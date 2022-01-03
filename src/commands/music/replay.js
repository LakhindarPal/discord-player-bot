module.exports = {
  name: "replay",
  description: "Replays the current song.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.seek(0);

    return bot.say.successMessage(interaction, "Restarted the current song.");
  }
};