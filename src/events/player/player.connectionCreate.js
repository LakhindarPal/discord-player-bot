module.exports = {
  name: "connectionCreate",
  execute(bot, queue, connection) {
    const embed = bot.say.baseEmbed(queue)
      .setAuthor({ name: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
      .setDescription(`👍 Joined ${connection.channel.toString()} and 📄 bouned ${queue.metadata.channel.toString()}`);

    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};