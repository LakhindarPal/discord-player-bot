import {
  type ColorResolvable,
  Colors,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";

export interface EmbedOptions {
  description?: string | null;
  color?: ColorResolvable | null;
}

export type ReplyOptions<T extends boolean = false> = T extends true
  ? { embeds: EmbedBuilder[]; flags: [MessageFlags.Ephemeral] }
  : { embeds: EmbedBuilder[] };

function base<T extends boolean = false>(
  options: EmbedOptions = {},
  ephemeral?: T,
): ReplyOptions<T> {
  return {
    embeds: [
      new EmbedBuilder()
        .setDescription(options.description ?? null)
        .setColor(options.color ?? null),
    ],
    ...(ephemeral ? { flags: [MessageFlags.Ephemeral] } : {}),
  } as ReplyOptions<T>;
}

function error<T extends boolean = true>(
  description: string,
  ephemeral: T = true as T,
): ReplyOptions<T> {
  return base({ color: Colors.Red, description }, ephemeral);
}

function success<T extends boolean = false>(
  description: string,
  ephemeral: T = false as T,
): ReplyOptions<T> {
  return base({ color: Colors.Green, description }, ephemeral);
}

function warning<T extends boolean = true>(
  description: string,
  ephemeral: T = true as T,
): ReplyOptions<T> {
  return base({ color: Colors.DarkOrange, description }, ephemeral);
}

function info<T extends boolean = false>(
  description: string,
  ephemeral: T = false as T,
): ReplyOptions<T> {
  return base({ color: Colors.Blurple, description }, ephemeral);
}

export const replies = {
  base,
  error,
  info,
  success,
  warning,
};

export default replies;
