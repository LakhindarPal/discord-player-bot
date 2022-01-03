const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "watchtogether",
  description: "Starts a youtube watch together activity voice session.",
  category: "activity",
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: "Mention the voice channel. (default: your voice channel)",
      required: false,
      channelTypes: ["GUILD_VOICE"]
    }
  ],
  async execute(bot, interaction) {
    const channel = (await interaction.options.getChannel("channel", false)) ?? interaction.member?.voice?.channel;

    if (!channel)
      return bot.say.wrongMessage(interaction, "You have to join or mention a voice channel.");

    if (!channel.viewable)
      return bot.say.wrongMessage(interaction, "I need \`View Channel\` permission.");

    if (!channel.permissionsFor(interaction.guild.me)?.has(1n))
      return bot.say.wrongMessage(interaction, "I need \`Create Invite\` permission.");

    const invite = await channel.createInvite({
      targetApplication: "755600276941176913",
      targetType: 2
    });

    const embed = bot.say.rootEmbed(interaction)
      .setTitle(`Successfully setup **YouTube Watch Together** activity to **${channel.name}** channel.`);

    const btnRow = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Join")
      .setStyle("LINK")
      .setURL(`${invite.url}`)
      ]);

    return interaction.reply({ embeds: [embed], components: [btnRow] }).catch(console.error);
  }
};