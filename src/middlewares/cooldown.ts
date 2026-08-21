import {
  Collection,
  MessageFlags,
  type RepliableInteraction,
} from "discord.js";
import type { ComponentAction } from "#types/action";
import type { SlashCommand } from "#types/command";

export function cooldown(
  interaction: RepliableInteraction,
  command: SlashCommand | ComponentAction,
) {
  const isComponent = "execute" in command && !("meta" in command);
  const meta = isComponent ? undefined : (command as SlashCommand).meta;
  const duration = isComponent
    ? ((command as ComponentAction).data.cooldown ?? 0)
    : (meta?.cooldown ?? 3);

  if (duration <= 0) return false;

  const commandName = isComponent
    ? (command as ComponentAction).data.id
    : [
        (command as SlashCommand).meta?.parent,
        (command as SlashCommand).meta?.group,
        (command as SlashCommand).data.name,
      ]
        .filter(Boolean)
        .join(" ");

  const cooldowns = interaction.client.cooldowns;

  let timestamps = cooldowns.get(commandName);
  if (!timestamps) {
    timestamps = new Collection<string, number>();
    cooldowns.set(commandName, timestamps);
  }

  const now = Date.now();
  const cooldownMs = duration * 1000;

  const lastUsed = timestamps.get(interaction.user.id);
  if (lastUsed !== undefined) {
    const expiresAt = lastUsed + cooldownMs;

    if (now < expiresAt) {
      const expiresUnix = Math.round(expiresAt / 1000);
      interaction.reply({
        content: `Please wait, you are on cooldown for the \`${commandName}\` command.
You can use it again <t:${expiresUnix}:R>.`,
        flags: [MessageFlags.Ephemeral],
      });
      return true;
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownMs);
  return false;
}
