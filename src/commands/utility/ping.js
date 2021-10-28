module.exports = {
  name: "ping",
  description: "Ping? Pong!",
  category: "utility",
  async execute(bot, interaction) {
    const embed1 = bot.say.baseEmbed(interaction)
      .setDescription("Pinging...");

    await interaction.reply({ ephemeral: true, embeds: [embed1] }).catch(console.error);

    const embed2 = bot.say.baseEmbed(interaction)
      .setTitle("🏓 Pong")
      .setDescription(`💓: ${Math.round(bot.ws.ping)} ms
⏱️: ${Date.now() - interaction.createdTimestamp} ms`);

    return interaction.editReply({ embeds: [embed2] });
  }
};