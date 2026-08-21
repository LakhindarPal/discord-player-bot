import { Glob } from "bun";
import {
  REST,
  Routes,
  SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

import type { CommandMeta, SlashCommand } from "../src/types/command";

// Check required env variables
const requiredEnv = ["DISCORD_BOT_TOKEN", "BOT_CLIENT_ID", "DEV_GUILD_ID"];
for (const variable of requiredEnv) {
  if (!process.env[variable]) {
    throw new Error(`[ENV]: '${variable}' is missing.`);
  }
}

type TopLevelBuilder = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

// Assemble standalone commands and subcommand groups
const glob = new Glob("src/commands/**/*.ts");
const commands = new Map<
  string,
  { builder: TopLevelBuilder; meta: CommandMeta }
>();

for await (const file of glob.scan(".")) {
  const mod = (await import(`../${file}`)) as SlashCommand;
  const parentName = mod.meta?.parent;

  if (parentName) {
    let parent = commands.get(parentName);
    if (!parent) {
      parent = {
        builder: new SlashCommandBuilder()
          .setName(parentName)
          .setDescription(`${parentName} commands`),
        meta: mod.meta,
      };
      commands.set(parentName, parent);
    }

    if (
      parent.builder instanceof SlashCommandBuilder &&
      mod.data instanceof SlashCommandSubcommandBuilder
    ) {
      parent.builder.addSubcommand(mod.data);
    }
  } else if (!(mod.data instanceof SlashCommandSubcommandBuilder)) {
    commands.set(mod.data.name, {
      builder: mod.data,
      meta: mod.meta,
    });
  }
}

// Categorize commands
const devCommands: TopLevelBuilder[] = [];
const globalCommands: TopLevelBuilder[] = [];

for (const { builder, meta } of commands.values()) {
  if (meta?.devOnly) {
    devCommands.push(builder);
  } else {
    globalCommands.push(builder);
  }
}

// Register commands via Discord REST API
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN,
);

try {
  if (devCommands.length > 0) {
    const data = (await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_CLIENT_ID,
        process.env.DEV_GUILD_ID,
      ),
      { body: devCommands },
    )) as unknown[];
    console.log(`Registered ${data.length} developer (/) commands.`);
  }

  if (globalCommands.length > 0) {
    const data = (await rest.put(
      Routes.applicationCommands(process.env.BOT_CLIENT_ID),
      {
        body: globalCommands,
      },
    )) as unknown[];
    console.log(`Registered ${data.length} global (/) commands.`);
  }
} catch (error) {
  console.error("Error registering commands:", error);
}
