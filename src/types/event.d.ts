import type { Message, TextChannel } from "discord.js";

export interface EventData {
  name: string;
  type?: "player" | "bot";
  once?: boolean;
}

export interface EventListener {
  data: EventData;
  execute: (...args: unknown[]) => Promise<unknown> | unknown;
}

export interface QueueMetadata {
  channel: TextChannel;
  message?: Message;
  previousVolume?: number;
}
