import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import { titleCase } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("songs")
  .setDescription("Browse playback queue or history tracks.")
  .addSubcommand((subcommand) =>
    subcommand.setName("queue").setDescription("View upcoming queue tracks."),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("history").setDescription("View played history tracks."),
  );

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export async function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const type = interaction.options.getSubcommand() as "queue" | "history";
  const tracks =
    type === "history" ? queue.history.tracks.data : queue.tracks.data;

  if (!tracks.length) {
    return interaction.reply(
      replies.error(
        `No ${type === "history" ? "played tracks" : "upcoming tracks"} found.`,
      ),
    );
  }

  const itemsPerPage = 10;
  const maxPage = Math.ceil(tracks.length / itemsPerPage);
  let currentPage = 0;

  function buildEmbed(page: number): EmbedBuilder {
    const start = page * itemsPerPage;
    const end = Math.min(start + itemsPerPage, tracks.length);
    const pageTracks = tracks.slice(start, end);

    return new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.guild?.iconURL() ?? undefined,
        name: `${titleCase(type)} Tracks`,
      })
      .setDescription(
        pageTracks
          .map(
            (track, index) =>
              `**${start + index + 1}**. ${track.toHyperlink()} ~ [${track.requestedBy?.toString() ?? "Unknown"}]`,
          )
          .join("\n"),
      )
      .setFooter({
        text: `Page ${page + 1} of ${maxPage} | Tracks ${start + 1}-${end} of ${tracks.length}`,
      })
      .setColor(Colors.Blurple);
  }

  function buildButtons(
    page: number,
    disabled = false,
  ): ActionRowBuilder<ButtonBuilder> {
    const firstBtn = new ButtonBuilder()
      .setCustomId("firstBtn")
      .setEmoji("1️⃣")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disabled || page === 0);

    const prevBtn = new ButtonBuilder()
      .setCustomId("prevBtn")
      .setEmoji("⬅️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disabled || page === 0);

    const nextBtn = new ButtonBuilder()
      .setCustomId("nextBtn")
      .setEmoji("➡️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disabled || page === maxPage - 1);

    const lastBtn = new ButtonBuilder()
      .setCustomId("lastBtn")
      .setEmoji("🔚")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(disabled || page === maxPage - 1);

    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      firstBtn,
      prevBtn,
      nextBtn,
      lastBtn,
    );
  }

  const message = await interaction.reply({
    components: [buildButtons(currentPage)],
    embeds: [buildEmbed(currentPage)],
    flags: [MessageFlags.Ephemeral],
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
      case "prevBtn":
        if (currentPage > 0) currentPage--;
        break;
      case "nextBtn":
        if (currentPage < maxPage - 1) currentPage++;
        break;
      case "lastBtn":
        currentPage = maxPage - 1;
        break;
      default:
        break;
    }

    await ctx.update({
      components: [buildButtons(currentPage)],
      embeds: [buildEmbed(currentPage)],
    });
  });

  collector.on("end", () => {
    const disabledButtons = buildButtons(currentPage, true);
    message.edit({ components: [disabledButtons] }).catch(() => null);
  });
}
