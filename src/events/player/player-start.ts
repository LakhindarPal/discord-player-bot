import type {
  ActionRowBuilder,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { type GuildQueue, GuildQueueEvent, type Track } from "discord-player";
import buttons from "#modules/playing/buttons";
import embed from "#modules/playing/embed";
import menu from "#modules/playing/menu";
import type { EventData, QueueMetadata } from "#types/event";

export const data: EventData = {
  name: GuildQueueEvent.PlayerStart,
  type: "player",
};

export async function execute(
  queue: GuildQueue<QueueMetadata>,
  track: Track<unknown>,
) {
  try {
    const lastMessage = queue.metadata.message;
    await lastMessage?.delete();
  } catch {
    // Ignore errors
  }

  try {
    const components = [menu(queue), ...buttons(queue)].filter(Boolean);
    const newMessage = await queue.metadata.channel.send({
      components:
        components as ActionRowBuilder<MessageActionRowComponentBuilder>[],
      embeds: [embed(queue, track)],
    });

    queue.metadata.message = newMessage;
  } catch (error) {
    console.error("Failed to send player start message:", error);
  }
}
