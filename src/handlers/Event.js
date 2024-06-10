import { useMainPlayer } from "discord-player";
import { sync } from "glob";

export async function loadEvents(client) {
  const eventFiles = sync("./src/events/**/*.js");
  const player = useMainPlayer();

  for (const file of eventFiles) {
    const event = await import(`../../${file}`);

    if (!event.data?.name) {
      throw new TypeError(
        `The event at ${file} is missing a required "data.name" property.`
      );
    }

    if (typeof event.execute !== "function") {
      throw new TypeError(
        `The event at ${file} is missing a required "execute" function.`
      );
    }

    if (event.data.type === "player") {
      player.events.on(event.data.name, (...args) => event.execute(...args));
    } else if (event.data.once) {
      client.once(event.data.name, (...args) => event.execute(...args));
    } else {
      client.on(event.data.name, (...args) => event.execute(...args));
    }

    if (process.env.DEVELOPMENT_MODE === "true") {
      console.log(`Loaded Event: ${event.data.name}`);
    }
  }
}
