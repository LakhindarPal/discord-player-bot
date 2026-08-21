import { Glob } from "bun";
import type { Client } from "discord.js";
import type { ComponentAction } from "#types/action";

export default async function loadActions(client: Client): Promise<void> {
  const glob = new Glob("src/actions/**/*.ts");

  for await (const file of glob.scan(".")) {
    const action = (await import(`../../${file}`)) as ComponentAction;

    if (!action.data.id) {
      throw new TypeError(
        `The action at ${file} is missing a required "data.id" property.`,
      );
    }

    if (typeof action.execute !== "function") {
      throw new TypeError(
        `The action at ${file} is missing a required "execute" function.`,
      );
    }

    const name = action.data.id;

    client.components.set(name, action);

    if (process.env.NODE_ENV === "development") {
      console.log(`Loaded Action: ${name}`);
    }
  }
}
