module.exports = {
  name: "remove",
  description: "Removes a specific song from the queue",
  usage: "<trackIndex>",
  category: "music",
  options: [{
    name: "index",
    description: "The song index to remove",
    type: "NUMBER",
    required: true
  }],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.wrongMessage(interaction, "There's no song to remove in the queue.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return bot.say.wrongMessage(interaction, "Provided Song Index does not exist.");

    const track = queue.remove(index)[0];

    return bot.say.successMessage(interaction, `Removed \`${track.title}\`.`);
  }
};