module.exports = {
  name: "connection",
  execute(bot, queue) {
    const embed = bot.utils
      .baseEmbed(queue)
      .setAuthor({ name: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL() })
      .setDescription(
        `👍 Joined ${queue.channel.toString()} and 📄 bouned ${queue.metadata.toString()}`
      );

    return queue.metadata.send({ embeds: [embed] }).catch(console.error);
  },
};
