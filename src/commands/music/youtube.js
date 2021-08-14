const { Permissions } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Starts a youtube watch together session.",
  category: "music",
  async execute(bot, interaction) {
    const channel = interaction.member?.voice?.channel;

    if (!channel)
      return bot.say.warnMessage(interaction, "You have to join a voice channel first.");

    if (!channel?.viewable)
      return bot.say.warnMessage(interaction, "I need **\`VIEW_CHANNEL\`** permission.");

    const permissions = channel?.permissionsFor(interaction.guild.me);
    if (!permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE))
      return bot.say.warnMessage(interaction, "I need **\`CREATE_INSTANT_INVITE\`** permission.");

    const invite = await channel?.createInvite({
      targetApplication: "755600276941176913",
      targetType: 2
    });

    const embed = bot.say.rootEmbed(interaction)
      .setTitle(`Successfully setup **YouTube Together** activity to **${channel.name}** channel.`)
      .setDescription(`[Click here the invite link to join it.](https:\/\/discord.com\/invite\/${invite.code})`);

    return interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
  }
};
