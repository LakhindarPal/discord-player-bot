import "#modules/check-env";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import { AppleMusicExtractor } from "discord-player-applemusic";
import { DeezerExtractor } from "discord-player-deezer";
import { SoundcloudExtractor } from "discord-player-soundcloud";
import { SpotifyExtractor } from "discord-player-spotify";
import type { ComponentAction } from "#types/action";
import type { SlashCommand } from "#types/command";
import loadEvents from "./loaders/events";

export class ExtendedClient extends Client {
  public override readonly commands = new Collection<string, SlashCommand>();
  public override readonly components = new Collection<
    string,
    ComponentAction
  >();
  public override readonly cooldowns = new Collection<
    string,
    Collection<string, number>
  >();
}

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const player = new Player(client);
await player.extractors.loadMulti([
  SoundcloudExtractor,
  AppleMusicExtractor,
  SpotifyExtractor,
  DeezerExtractor,
]);

// Load all events handler
await loadEvents(client);

await client.login(process.env.DISCORD_BOT_TOKEN);

// prevent crash on unhandled promise rejection
process.on("unhandledRejection", (reason) => console.error(reason));
// prevent crash on uncaught exception
process.on("uncaughtException", (error) => console.error(error));
// log warning
process.on("warning", (message) => console.error(message));
