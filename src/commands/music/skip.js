module.exports = {
  name: "skip",
  description: "Skips the current song",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return bot.say.warnMessage(interaction, "No more songs in the queue to skip.");

    queue.skip();

    return bot.say.infoMessage(interaction, "Skipped to the next song.");
  }
};