import {
  ActivityType,
  type Client,
  Events,
  PresenceUpdateStatus,
} from "discord.js";
import type { EventData } from "#types/event";
import loadActions from "../../loaders/actions";
import loadCommands from "../../loaders/commands";

export const data: EventData = {
  name: Events.ClientReady,
  once: true,
};

export async function execute(client: Client) {
  await loadCommands(client);
  await loadActions(client);

  client.user?.setPresence({
    activities: [{ name: "/play", type: ActivityType.Listening }],
    status: PresenceUpdateStatus.Online,
  });

  console.log(`Ready! Logged in as ${client.user?.tag}`);
}
