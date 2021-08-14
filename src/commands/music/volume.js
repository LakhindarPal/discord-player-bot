module.exports = {
  name: "volume",
  description: "Shows the current volume",
  category: "music",
  subCommands: ["<1-200>**\nChange the bots output volume."],
  options: [{
    name: "amount",
    description: "Changes the bot’s output volume",
    type: "NUMBER",
    required: false
  }],
  execute(bot, interaction) {
    const newVol = interaction.options.getNumber("amount", false);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    if (!newVol) {
      const embed = bot.say.rootEmbed(interaction)
        .setDescription(`Volume is at \`${queue.volume}%\`.`)
        .setFooter(`Use \'\/volume <1-200>\' to change the volume.`);

      return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
    }

    if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
      return bot.say.warnMessage(interaction, "Provide a valid number between 1 to 200.");

    queue.setVolume(newVol);

    return bot.say.infoMessage(interaction, `Volume is updated to \`${queue.volume}%\`.`);
  }
};