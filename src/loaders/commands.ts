import { Glob } from "bun";
import type { Client } from "discord.js";
import type { SlashCommand } from "#types/command";

export default async function loadCommands(client: Client): Promise<void> {
  const glob = new Glob("src/commands/**/*.ts");

  for await (const file of glob.scan(".")) {
    const command = (await import(`../../${file}`)) as SlashCommand;

    if (!command.data.name) {
      throw new TypeError(
        `The command at ${file} is missing a required "data.name" property.`,
      );
    }

    if (!command.data.description) {
      throw new TypeError(
        `The command at ${file} is missing a required "data.description" property.`,
      );
    }

    if (typeof command.execute !== "function") {
      throw new TypeError(
        `The command at ${file} is missing a required "execute" function.`,
      );
    }

    const parts = [
      command.meta?.parent,
      command.meta?.group,
      command.data.name,
    ].filter(Boolean);

    const name = parts.join(" ");

    client.commands.set(name, command);

    if (process.env.NODE_ENV === "development") {
      console.log(`Loaded Command: ${name}`);
    }
  }
}
