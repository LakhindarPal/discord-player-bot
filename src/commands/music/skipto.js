const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "skipto",
  description: "Skip to the given track, removing others on the way",
  category: "music",
  options: [
    {
      name: "index",
      description: "The track index to skip to",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  execute(bot, interaction, queue) {
    if (queue.size < 1) return bot.say.errorEmbed(interaction, "The queue has no more track.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (index > queue.size || index < 0)
      return bot.say.wrongEmbed(interaction, "Provided track index does not exist.");

    queue.node.skipTo(index);

    return bot.say.successEmbed(interaction, `Skipped to track ${index + 1}.`);
  },
};
