module.exports = {
  name: "mute",
  description: "Mutes the playback.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    if (queue.volume === 0)
      return bot.say.warnMessage(interaction, "The song is already muted.");

    queue.mute();
    return bot.say.infoMessage(interaction, "Muted the playback.");
  }
};