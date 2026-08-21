import { Glob } from "bun";
import type { Client } from "discord.js";
import { type GuildQueueEvents, useMainPlayer } from "discord-player";
import type { EventListener, QueueMetadata } from "#types/event";

export default async function loadEvents(client: Client): Promise<void> {
  const glob = new Glob("./src/events/**/*.ts");
  const player = useMainPlayer();

  for await (const file of glob.scan(".")) {
    const event = (await import(`../../${file}`)) as EventListener;

    if (!event.data?.name) {
      throw new TypeError(
        `The event at ${file} is missing a required "data.name" property.`,
      );
    }

    if (typeof event.execute !== "function") {
      throw new TypeError(
        `The event at ${file} is missing a required "execute" function.`,
      );
    }

    const name = event.data.name;

    if (event.data.type === "player") {
      player.events.on(
        name as keyof GuildQueueEvents<QueueMetadata>,
        (...args: unknown[]) => event.execute(...args),
      );
    } else if (event.data.once) {
      client.once(name, (...args) => event.execute(...args));
    } else {
      client.on(name, (...args) => event.execute(...args));
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`Loaded Event: ${name}`);
    }
  }
}
