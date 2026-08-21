import type { Collection } from "discord.js";
import type { ComponentAction } from "./action";
import type { SlashCommand } from "./command";
import "discord.js";

declare module "discord.js" {
  interface Client {
    readonly commands: Collection<string, SlashCommand>;
    readonly components: Collection<string, ComponentAction>;
    readonly cooldowns: Collection<string, Collection<string, number>>;
  }
}
