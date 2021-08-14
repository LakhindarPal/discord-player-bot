const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trackStart",
  execute(bot, queue, track) {
    if (!bot.utils.havePermissions(queue.metadata.channel)) return;

    const embed = new MessageEmbed()
      .setTitle("Now playing")
      .setColor(queue.guild.me.displayColor || "#00FFFF")
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`);

    return queue.metadata.channel.send({ embeds: [embed] });
  }
};
