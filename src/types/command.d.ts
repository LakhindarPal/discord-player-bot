import type {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import type { QueueMetadata } from "#types/event";

export interface CommandMeta {
  cooldown?: number;
  category: "music" | "dev" | "config" | "misc";
  parent?: string;
  group?: string;
  devOnly?: boolean;
  queueOnly?: boolean;
  sameVC?: boolean;
}

export interface SlashCommand {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandBuilder
    | SlashCommandOptionsOnlyBuilder;
  meta: CommandMeta;
  suggest?(interaction: AutocompleteInteraction): Promise<unknown> | unknown;
  execute(
    interaction: ChatInputCommandInteraction,
    queue?: GuildQueue<QueueMetadata>,
  ): Promise<unknown> | unknown;
}
