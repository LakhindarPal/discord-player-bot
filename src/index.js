import "dotenv/config";
import "./modules/checkEnv.js";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import {
  YoutubeiExtractor,
  createYoutubeiStream,
} from "discord-player-youtubei";
import {
  SpotifyExtractor,
  AppleMusicExtractor,
} from "@discord-player/extractor";
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

await player.extractors.register(YoutubeiExtractor, {
  authentication: {
    access_token: process.env.YT_ACCESS_TOKEN || "",
    refresh_token: process.env.YT_REFRESH_TOKEN || "",
    scope:
      "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube-paid-content",
    token_type: "Bearer",
    expiry_date: "2024-07-10T11:37:01.093Z",
  },
});
await player.extractors.register(SpotifyExtractor, {
  createStream: createYoutubeiStream,
});
await player.extractors.register(AppleMusicExtractor, {
  createStream: createYoutubeiStream,
});
await player.extractors.register(DeezerExtractor);
await player.extractors.register(TidalExtractor);
// Load default extractors except YouTube, Spotify and Apple Music
await player.extractors.loadDefault(
  (ext) =>
    !["YouTubeExtractor", "SpotifyExtractor", "AppleMusicExtractor"].includes(
      ext
    )
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
