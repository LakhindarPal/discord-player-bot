import { Events } from "discord.js";
import type { EventData } from "#types/event";

export const data: EventData = {
  name: Events.Warn,
};

export function execute(info: string) {
  console.warn(info);
}
