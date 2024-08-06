import "dotenv/config";
import "./modules/checkEnv.js";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

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

await player.extractors.register(YoutubeiExtractor, {
  authentication: process.env.YT_CREDENTIAL,
  streamOptions: {
    useClient: "ANDROID",
  },
});

await player.extractors.loadDefault(
  (ext) => !["YouTubeExtractor"].includes(ext)
);

// Load events
await loadEvents(client);

await client.login(process.env.DISCORD_TOKEN);

// prevent crash on unhandled promise rejection
process.on("unhandledRejection", (reason) => console.error(reason));
// prevent crash on uncaught exception
process.on("uncaughtException", (error) => console.error(error));
// log warning
process.on("warning", (warning) => console.error(warning));
