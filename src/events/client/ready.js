import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import { loadCommands } from "../../handlers/command.js";

export const data = {
  name: Events.ClientReady,
  once: true,
};
export async function execute(client) {
  await loadCommands(client);

  client.user.setPresence({
    activities: [{ name: "/help", type: ActivityType.Listening }],
    status: PresenceUpdateStatus.Online,
  });

  if (process.env.REGISTER_COMMANDS === "true") {
    const devGuild = client.guilds.cache.get(process.env.DEV_GUILD);
    const { devCommands, otherCommands } = client.commands.reduce(
      (acc, { data: cmd }) => {
        const cmdData = {
          name: cmd.name,
          description: cmd.description,
          options: cmd.options,
        };

        if (cmd.devOnly || cmd.category === "dev") {
          acc.devCommands.push(cmdData);
        } else {
          acc.otherCommands.push(cmdData);
        }

        return acc;
      },
      { devCommands: [], otherCommands: [] }
    );

    if (devGuild) await devGuild.commands.set(devCommands);
    await client.application?.commands.set(otherCommands);
  }

  console.log(`Ready! Logged in as ${client.user.tag}`);
}
