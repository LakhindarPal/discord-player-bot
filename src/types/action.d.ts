import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import type { QueueMetadata } from "#types/event";

export interface ActionData {
  id: string;
  queueOnly?: boolean;
  sameVC?: boolean;
  devOnly?: boolean;
  cooldown?: number;
}

export interface ComponentAction {
  data: ActionData;
  execute(
    interaction: ButtonInteraction | StringSelectMenuInteraction,
    queue?: GuildQueue<QueueMetadata>,
  ): Promise<unknown> | unknown;
}
