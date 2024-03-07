const { useHistory } = require("discord-player");

module.exports = {
  name: "back",
  description: "Play the history track",
  category: "music",
  execute(bot, interaction) {
    const history = useHistory(interaction.guildId);

    if (history.isEmpty())
      return bot.say.errorEmbed(interaction, "The queue has no history track.");

    history.previous();

    return bot.say.successEmbed(interaction, "Backed the history track.");
  },
};
