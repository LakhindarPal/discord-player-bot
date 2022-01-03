module.exports = {
  name: "uptime",
  description: "Returns the uptime of the bot",
  category: "utility",
  execute(bot, interaction) {
    const uptime = bot.utils.formatDuration(bot.uptime);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor({ name:"Uptime", iconURL: bot.user.displayAvatarURL() })
      .setDescription(`${uptime}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
};