import "dotenv/config";
import { Collection, REST, Routes } from "discord.js";
import { loadCommands } from "../src/handlers/command.js";

// check env variables
const envVariables = ["DISCORD_TOKEN", "CLIENT_ID", "DEV_GUILD"];
for (const variable of envVariables) {
  if (!process.env[variable]) {
    throw new Error(`[ENV]: '${variable}' is missing.`);
  }
}
// Initialize a fake client with an empty commands collection
const fakeClient = { commands: new Collection() };
await loadCommands(fakeClient);

// Destructure and categorize commands
const { devCommands, otherCommands } = fakeClient.commands.reduce(
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

// Initialize REST client with the Discord token
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Function to register commands
const registerCommands = async () => {
  try {
    // Register developer commands
    const devData = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.DEV_GUILD
      ),
      { body: devCommands }
    );
    console.log(`Registered ${devData.length} developer (/) commands.`);

    // Register other commands
    const otherData = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: otherCommands }
    );
    console.log(`Registered ${otherData.length} other (/) commands.`);
  } catch (error) {
    console.error("Error registering commands:", error);
  }
};

// Execute the registration function
registerCommands();
