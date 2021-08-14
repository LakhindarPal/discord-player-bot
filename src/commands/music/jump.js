module.exports = {
  name: "jump",
  description: "Jump to a specific track in the queue.",
  category: "music",
  usage: "<songIndex>",
  options: [{
    name: "index",
    description: "Provide the song index to jump",
    type: "NUMBER",
    required: true
  }],
  execute(bot, interaction) {
    const index = interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.canModifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.errorMessage(interaction, "There is currently no song in the queue.");

    if (!index || index > queue.tracks.length || index < 1 || !queue.tracks[index])
      return bot.say.errorMessage(interaction, "Provided song index does not exist.");

    queue.jump(index);

    return bot.say.infoMessage(interaction, `Jumped to song \`${index}\`.`);
  }
};