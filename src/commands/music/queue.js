module.exports = {
  name: "queue",
  description: "Shows the queue.",
  category: "music",
  options: [{
    name: "page",
    description: "The page number of the queue",
    type: "NUMBER",
    required: false
  }],
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "I’m currently not playing in this server.");

    if (!queue.tracks.length)
      return bot.say.wrongMessage(interaction, "There is currently no song in the queue.");

    let page = interaction.options.getNumber("page", false) ?? 1;

    const multiple = 10;

    const maxPages = Math.ceil(queue.tracks.length / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.slice(start, end);

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(
        `${tracks.map((song, i) => 
        `${start + (++i)} - [${song.title}](${song.url}) ~ [${song.requestedBy.toString()}]`
        ).join("\n")}`
      )
      .setFooter({
        text: `Page ${page} of ${maxPages} | song ${start + 1} to ${end > queue.tracks.length ? `${queue.tracks.length}` : `${end}`} of ${queue.tracks.length}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      });

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};