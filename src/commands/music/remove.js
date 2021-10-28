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
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "There's no song to remove in the queue.");

    index = index - 1;

    if (index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return bot.say.warnMessage(interaction, "Provided Song Index does not exist.");

    queue.remove(index);

    return bot.say.successMessage(interaction, `Removed track \`${index}\`.`);
  }
};