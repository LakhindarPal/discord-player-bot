import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { FiltersName, GuildQueue } from "discord-player";
import ffmpegFilters from "#constants/ffmpeg-filters";
import replies from "#modules/replies";
import { titleCase } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("filters")
  .setDescription("Configure and toggle audio filters.");

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

function buildPayload(queue: GuildQueue<QueueMetadata>, disabled = false) {
  const enabled = queue.filters.ffmpeg.getFiltersEnabled();

  const embed = new EmbedBuilder()
    .setTitle("Audio Filters Dashboard")
    .setDescription(
      `**Active Filters**: ${
        enabled.length > 0
          ? enabled.map((f) => `\`${titleCase(f)}\``).join(", ")
          : "*None*"
      }\n\nSelect or deselect filters from the menu below to toggle.`,
    )
    .setColor(Colors.Blurple);

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("filters_select")
    .setPlaceholder(
      enabled.length > 0
        ? `${enabled.length} filter${enabled.length > 1 ? "s" : ""} active`
        : "Select filters to toggle...",
    )
    .setMinValues(0)
    .setMaxValues(ffmpegFilters.length)
    .setDisabled(disabled)
    .addOptions(
      ffmpegFilters.map((filter) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(filter.name)
          .setValue(filter.value)
          .setDefault(enabled.includes(filter.value)),
      ),
    );

  const clearBtn = new ButtonBuilder()
    .setCustomId("filters_clear")
    .setLabel("Disable All")
    .setStyle(ButtonStyle.Danger)
    .setDisabled(disabled || enabled.length === 0);

  const selectRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);
  const clearRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    clearBtn,
  );

  return { components: [selectRow, clearRow], embeds: [embed] };
}

export async function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (!queue.filters.ffmpeg) {
    return interaction.reply(replies.error("Audio filters are unavailable."));
  }

  const payload = buildPayload(queue);
  const response = await interaction.reply({
    ...payload,
    flags: [MessageFlags.Ephemeral],
  });

  const collector = response.createMessageComponentCollector({
    time: 120_000,
  });

  collector.on("collect", async (ctx) => {
    if (ctx.customId === "filters_select" && ctx.isStringSelectMenu()) {
      const selected = ctx.values as FiltersName[];

      if (selected.length === 0) {
        queue.filters.ffmpeg.setFilters(false);
      } else {
        const active = {} as Record<FiltersName, boolean>;
        for (const filter of ffmpegFilters) {
          active[filter.value] = selected.includes(filter.value);
        }
        queue.filters.ffmpeg.setFilters(active);
      }

      await ctx.update(buildPayload(queue));
      return;
    }

    if (ctx.customId === "filters_clear" && ctx.isButton()) {
      queue.filters.ffmpeg.setFilters(false);
      await ctx.update(buildPayload(queue));
      return;
    }
  });

  collector.on("end", () => {
    const disabledPayload = buildPayload(queue, true);
    interaction.editReply(disabledPayload).catch(() => null);
  });
}
