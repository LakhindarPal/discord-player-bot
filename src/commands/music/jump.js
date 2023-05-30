const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "jump",
  description: "Jump to specific track on the queue without removing other tracks",
  category: "music",
  options: [
    {
      name: "index",
      description: "The track index to jump to",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  execute(bot, interaction, queue) {
    if (queue.isEmpty()) return bot.say.errorEmbed(interaction, "The queue has no more track.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (index > queue.size || index < 0)
      return bot.say.wrongEmbed(interaction, "Provided track index does not exist.");

    queue.node.jump(index);

    return bot.say.successEmbed(interaction, `Jumped to track ${index + 1}.`);
  },
};
