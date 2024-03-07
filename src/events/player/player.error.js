const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "error",
  execute(bot, queue, error) {
    bot.utils.sendErrorLog(bot, error, "error");

    const embed = new EmbedBuilder()
      .setTitle("An error occured while playing")
      .setDescription(`Reason: \`${error.message}\``)
      .setColor(Colors.Red);

    return queue.metadata.send({ embeds: [embed] }).catch(console.error);
  },
};
