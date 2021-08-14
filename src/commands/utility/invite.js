const { inviteLink } = require("../../../config.json");

module.exports = {
  name: "invite",
  description: "Get the bot’s invite link",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.rootEmbed(interaction)
      .setTitle("__**Click to invite Deejay Stereo to your server.**__")
      .setURL(inviteLink);

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};