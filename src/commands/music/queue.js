const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Show tracks in the queue.",
  category: "music",
  options: [
    {
      name: "page",
      description: "The page number of the queue",
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],
  execute(bot, interaction, queue) {
    if (!queue.size) return bot.say.wrongEmbed(interaction, "There is no track in the queue.");

    let page = interaction.options.getNumber("page", false) ?? 1;

    const multiple = 10;

    const maxPages = Math.ceil(queue.size / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.toArray().slice(start, end);

    const embed = bot.utils
      .baseEmbed(interaction)
      .setDescription(
        `${tracks
          .map(
            (track, i) =>
              `${start + ++i} - [${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`
          )
          .join("\n")}`
      )
      .setFooter({
        text: `Page ${page} of ${maxPages} | track ${start + 1} to ${
          end > queue.size ? `${queue.size}` : `${end}`
        } of ${queue.size}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  },
};
