import uFuzzy from "@leeoniya/ufuzzy";
import {
  ActionRowBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  MessageFlags,
  SlashCommandSubcommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { type GuildQueue, GuildQueueEvent } from "discord-player";
import replies from "#modules/replies";
import { pluralize } from "#modules/utils";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandSubcommandBuilder()
  .setName("match")
  .setDescription("Search and select specific tracks to remove.")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("Keywords or title to search.")
      .setRequired(true),
  );

export const meta: CommandMeta = {
  category: "music",
  parent: "remove",
  queueOnly: true,
  sameVC: true,
};

const uf = new uFuzzy();

export async function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  if (queue.isEmpty()) {
    return interaction.reply(replies.error("No upcoming tracks found."));
  }

  const query = interaction.options.getString("query", true).trim();
  const tracks = queue.tracks.toArray();
  const titles = tracks.map((track) => track.title);

  const [indices] = uf.search(titles, query);

  if (!indices || indices.length === 0) {
    return interaction.reply(
      replies.error(`No tracks matching \`${query}\` were found.`),
    );
  }

  const matched = indices
    .slice(0, 25)
    .map((idx) => tracks[idx])
    .filter((track): track is NonNullable<typeof track> => track !== undefined);

  if (!matched.length) {
    return interaction.reply(
      replies.error(`No tracks matching \`${query}\` were found.`),
    );
  }

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("remove_match_select")
    .setPlaceholder("Select tracks to remove...")
    .setMinValues(1)
    .setMaxValues(matched.length)
    .addOptions(
      matched.map((track) => {
        const option = new StringSelectMenuOptionBuilder()
          .setLabel(track.title.slice(0, 100))
          .setValue(track.id);

        const desc = `${track.author} • ${track.duration}`.slice(0, 100);
        if (desc) option.setDescription(desc);

        return option;
      }),
    );

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    selectMenu,
  );

  const response = await interaction.reply({
    components: [row],
    content: `Found **${matched.length}** matching ${pluralize(matched.length, "track")}. Select which to remove:`,
    flags: [MessageFlags.Ephemeral],
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    filter: (i) => i.user.id === interaction.user.id,
    time: 60_000,
  });

  collector.on("collect", async (i) => {
    const selectedIds = new Set(i.values);
    const removedTracks = matched.filter((track) => selectedIds.has(track.id));

    queue.tracks.remove((track) => selectedIds.has(track.id));
    queue.emit(GuildQueueEvent.AudioTracksRemove, queue, removedTracks);

    await i.update({
      components: [],
      content: `Removed **${selectedIds.size}** matching ${pluralize(selectedIds.size, "track")}.`,
    });

    collector.stop("selected");
  });

  collector.on("end", async (_, reason) => {
    if (reason === "time") {
      await interaction
        .editReply({
          components: [],
          content: "Timed out. No tracks were removed.",
        })
        .catch(() => {});
    }
  });
}
