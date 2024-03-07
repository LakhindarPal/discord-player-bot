const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Check or change the volume",
  category: "music",
  options: [
    {
      name: "amount",
      description: "Volume amount to set",
      type: ApplicationCommandOptionType.Number,
      required: false,
      minValue: 1,
      maxValue: 200,
    },
  ],
  execute(bot, interaction, queue) {
    const newVol = interaction.options.getNumber("amount", false);

    if (!newVol) {
      const embed = bot.utils
        .baseEmbed(interaction)
        .setDescription(`Current volume is \`${queue.node.volume}%\`.`)
        .setFooter({ text: "Use '/volume <1-200>' to change the volume." });

      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    queue.node.setVolume(newVol);

    return bot.say.successEmbed(interaction, `Volume is updated to ${newVol}.`);
  },
};
