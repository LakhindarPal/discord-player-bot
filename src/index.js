import "dotenv/config";
import "./modules/checkEnv.js";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";
import { default as DeezerExtractor } from "discord-player-deezer";
import { default as TidalExtractor } from "discord-player-tidal";

import { loadEvents } from "./handlers/event.js";

class ExtendedClient extends Client {
  commands = new Collection();
  components = new Collection();
  cooldowns = new Collection();

  constructor(options) {
    super(options);
  }
}

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const player = new Player(client);

await player.extractors.register(YoutubeiExtractor, {});
await player.extractors.register(DeezerExtractor);
await player.extractors.register(TidalExtractor);
await player.extractors.loadDefault();

await loadEvents(client);

await client.login(process.env.DISCORD_TOKEN);

// prevent crash on unhandled promise rejection
process.on("unhandledRejection", (reason) => console.error(reason));
// prevent crash on uncaught exception
process.on("uncaughtException", (error) => console.error(error));
// log warning
process.on("warning", (warning) => console.error(warning));
