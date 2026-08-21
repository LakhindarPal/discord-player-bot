import { Events } from "discord.js";
import type { EventData } from "#types/event";

export const data: EventData = {
  name: Events.Error,
};

export function execute(error: Error) {
  console.error(error);
}
