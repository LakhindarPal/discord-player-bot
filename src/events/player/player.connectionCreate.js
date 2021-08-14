const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "connectionCreate",
  execute(bot, queue, connection) {
    const embed = new MessageEmbed()
      .setAuthor("Deejay Stereo Bot", bot.user.displayAvatarURL())
      .setDescription(`👍 Joined ${queue.connection.channel.toString()} and 📄 bouned ${queue.metadata.channel.toString()}`)
      .setColor(queue.guild.me.displayColor || "#00FFFF");

    return queue.metadata.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);
  }
};
