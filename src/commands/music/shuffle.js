module.exports = {
  name: "shuffle",
  description: "Shuffle the queue.",
  category: "music",
  execute(bot, interaction, queue) {
    if (queue.size < 3)
      return bot.say.wrongEmbed(interaction, "Need at least 3 tracks in the queue to shuffle.");

    queue.tracks.shuffle();

    return bot.say.successEmbed(interaction, "Shuffled the queue.");
  },
};
