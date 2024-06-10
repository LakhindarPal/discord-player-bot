import { ApplicationCommandOptionType } from "discord.js";
import { BaseEmbed, ErrorEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "queue",
  description: "Show the songs in the queue.",
  options: [
    {
      name: "page",
      description: "The page number of the queue",
      type: ApplicationCommandOptionType.Number,
      required: false,
      min_value: 1,
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.isEmpty()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There are no songs in the queue.")],
    });
  }

  let page = interaction.options.getNumber("page", false) ?? 1;
  const multiple = 10;
  const maxPage = Math.ceil(queue.size / multiple);

  if (page > maxPage) page = maxPage;

  const end = page * multiple;
  const start = end - multiple;
  const tracks = queue.tracks.toArray().slice(start, end);

  const embed = BaseEmbed()
    .setDescription(
      tracks
        .map(
          (track, i) =>
            `${start + i + 1} - [${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`
        )
        .join("\n")
    )
    .setFooter({
      text: `Page ${page} of ${maxPage} | Showing songs ${start + 1} to ${
        end > queue.size ? queue.size : end
      } of ${queue.size}`,
      iconURL: interaction.user.displayAvatarURL(),
    });

  return interaction.reply({ ephemeral: true, embeds: [embed] });
}
