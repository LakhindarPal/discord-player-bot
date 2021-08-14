const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "Returns the uptime of the bot",
  category: "utility",
  execute(bot, interaction) {
    const uptime = moment
      .duration(bot.uptime)
      .format(" D [Days], H [Hours], m [Minutes], s [Seconds]");

    const embed = bot.say.rootEmbed(interaction)
      .setAuthor("Uptime", bot.user.displayAvatarURL())
      .setDescription(`${uptime}`);

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};