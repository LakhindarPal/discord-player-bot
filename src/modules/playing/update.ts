import type {
  ActionRowBuilder,
  MessageActionRowComponentBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import type { QueueMetadata } from "#types/event";
import buttons from "./buttons";
import embed from "./embed";
import menu from "./menu";

export default async function updatePlayingUi(
  queue: GuildQueue<QueueMetadata>,
) {
  try {
    const components = [menu(queue), ...buttons(queue)].filter(Boolean);
    await queue.metadata.message?.edit({
      components:
        components as ActionRowBuilder<MessageActionRowComponentBuilder>[],
      embeds: [embed(queue)],
    });
  } catch {
    // Ignore edit errors if message was deleted or inaccessible
  }
}
