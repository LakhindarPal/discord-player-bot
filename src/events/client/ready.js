import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import { loadCommands } from "../../handlers/command.js";

export const data = {
  name: Events.ClientReady,
  once: true,
};
export async function execute(client) {
  await loadCommands(client);

  client.user.setPresence({
    activities: [{ name: "/play", type: ActivityType.Listening }],
    status: PresenceUpdateStatus.Online,
  });

  console.log(`Ready! Logged in as ${client.user.tag}`);
}
