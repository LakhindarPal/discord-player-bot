module.exports = {
  name: "resume",
  description: "Resume the playback",
  category: "music",
  execute(bot, interaction, queue) {
    if (queue.node.isPlaying())
      return bot.say.wrongEmbed(interaction, "The playback is already playing.");

    queue.node.resume();

    return bot.say.successEmbed(interaction, "Resumed the playback.");
  },
};
