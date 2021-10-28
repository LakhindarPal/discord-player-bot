module.exports = {
  name: "resume",
  description: "Resumes the current paused song.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!queue.connection.paused)
      return bot.say.warnMessage(interaction, "The song is not paused.");

    queue.setPaused(false);

    return bot.say.successMessage(interaction, "Resumed the corrent song.");
  }
};