import {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { useHistory } from "discord-player";
import { BaseEmbed, ErrorEmbed } from "../../modules/embeds.js";
import { titleCase } from "../../modules/utils.js";

export const data = {
  name: "songs",
  description: "Display songs from the queue or history.",
  options: ["queue", "history"].map((type) => ({
    type: ApplicationCommandOptionType.Subcommand,
    name: type,
    description: `Display songs from the ${type}.`,
  })),
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction, queue) {
  const type = interaction.options.getSubcommand();
  const history = useHistory(interaction.guildId);
  const songsData =
    type === "history" ? history.tracks.data : queue.tracks.data;

  if (!songsData.length) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed(`There are no songs in the ${type}.`)],
    });
  }

  const itemsPerPage = 10;
  const maxPage = Math.ceil(songsData.length / itemsPerPage);
  let currentPage = 0;

  const embeds = [];
  for (let page = 0; page < maxPage; page++) {
    const start = page * itemsPerPage;
    const end = Math.min(start + itemsPerPage, songsData.length);
    const tracks = songsData.slice(start, end);

    const embed = BaseEmbed()
      .setAuthor({
        iconURL: interaction.guild.iconURL(),
        name: `${titleCase(type)} songs`,
      })
      .setDescription(
        tracks
          .map(
            (track, index) =>
              `**${start + index + 1}**. [${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`
          )
          .join("\n")
      )
      .setFooter({
        text: `Page ${page + 1} of ${maxPage} | Showing songs ${start + 1} to ${end} of ${songsData.length}`,
      });

    embeds.push(embed);
  }

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("firstBtn")
      .setEmoji("⏪")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("previousBtn")
      .setEmoji("◀️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("nextBtn")
      .setEmoji("▶️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(maxPage <= 1),
    new ButtonBuilder()
      .setCustomId("lastBtn")
      .setEmoji("⏩")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(maxPage <= 1)
  );

  const message = await interaction.reply({
    ephemeral: true,
    embeds: [embeds[currentPage]],
    components: [row],
  });

  const collector = message.createMessageComponentCollector({
    filter: (ctx) => ctx.user.id === interaction.user.id,
    time: 60_000,
  });

  collector.on("collect", async (ctx) => {
    switch (ctx.customId) {
      case "firstBtn":
        currentPage = 0;
        break;
      case "previousBtn":
        if (currentPage > 0) currentPage--;
        break;
      case "nextBtn":
        if (currentPage < embeds.length - 1) currentPage++;
        break;
      case "lastBtn":
        currentPage = embeds.length - 1;
        break;
      default:
        break;
    }

    row.components[0].setDisabled(currentPage === 0);
    row.components[1].setDisabled(currentPage === 0);
    row.components[2].setDisabled(currentPage === embeds.length - 1);
    row.components[3].setDisabled(currentPage === embeds.length - 1);

    await ctx.update({
      embeds: [embeds[currentPage]],
      components: [row],
    });
  });

  collector.on("end", () => {
    row.components.forEach((component) => component.setDisabled(true));
    message.edit({ components: [row] });
  });
}
