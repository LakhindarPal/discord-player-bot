module.exports = {
  name: "replay",
  description: "Replay the current track.",
  category: "music",
  execute(bot, interaction, queue) {
    queue.node.seek(0);

    return bot.say.successEmbed(interaction, "Replayed the current track.");
  },
};
