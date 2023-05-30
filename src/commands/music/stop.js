module.exports = {
  name: "stop",
  description: "Stop the playback.",
  category: "music",
  async execute(bot, interaction, queue) {
    queue.node.delete();

    return bot.say.successEmbed(interaction, "Stopped the playback.");
  },
};
