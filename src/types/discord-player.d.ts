import "discord-player";

declare module "discord-player" {
  interface GuildQueueEvents<Meta = unknown> {
    repeatChange: (queue: GuildQueue<Meta>) => unknown;
    shuffleToggle: (queue: GuildQueue<Meta>) => unknown;
    tracksOrderChange: (queue: GuildQueue<Meta>) => unknown;
  }
}
