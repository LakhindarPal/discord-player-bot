import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import { pluralize } from "#modules/utils";
import type { QueueMetadata } from "#types/event";

export default function menu(
  queue: GuildQueue<QueueMetadata>,
): ActionRowBuilder<StringSelectMenuBuilder> | null {
  if (!queue.size) return null;

  const duration = queue.durationFormatted;
  const placeholder = `${queue.size} ${pluralize(queue.size, "song")} in queue${duration ? ` (Total: ${duration})` : ""}`;

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("songs_menu")
    .setPlaceholder(placeholder)
    .addOptions(
      queue.tracks.data.slice(0, 25).map((track, index) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(
            `${index + 1}. ${
              track.cleanTitle.length >= 95
                ? `${track.cleanTitle.slice(0, 91)}...`
                : track.cleanTitle
            }`,
          )
          .setDescription(
            `Duration: ${track.duration} | Requester: ${track.requestedBy?.displayName ?? track.requestedBy?.username ?? "Unknown"}`.slice(
              0,
              99,
            ),
          )
          .setValue(index.toString()),
      ),
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    selectMenu,
  );
}
