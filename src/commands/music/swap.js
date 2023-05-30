const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "swap",
  description: "Swap two tracks in the queue",
  category: "music",
  options: [
    {
      name: "first",
      description: "The first track to swap",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "second",
      description: "The second track to swap",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  execute(bot, interaction, queue) {
    if (queue.size < 3)
      return bot.say.errorEmbed(
        interaction,
        "Need at least 3 songs in the queue to use this command."
      );

    const first = interaction.options.getNumber("first", true);
    const second = interaction.options.getNumber("second", true);

    if (first < 1 || first >= queue.size)
      return bot.say.wrongEmbed(interaction, "Provided `first` track index is not valid.");

    if (second < 1 || second >= queue.size)
      return bot.say.wrongEmbed(interaction, "Provided `second` track index is not valid.");

    if (first === second)
      return bot.say.wrongEmbed(interaction, "The tracks are already in this position.");

    queue.node.swap(first, second);

    return bot.say.successEmbed(interaction, `Track ${first} & ${second} has been swapped.`);
  },
};
