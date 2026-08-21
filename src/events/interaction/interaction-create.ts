import {
  type BaseInteraction,
  type ButtonInteraction,
  codeBlock,
  Events,
  MessageFlags,
  type StringSelectMenuInteraction,
} from "discord.js";
import { useMainPlayer, useQueue } from "discord-player";

import type { ComponentAction } from "#types/action";
import type { SlashCommand } from "#types/command";

import type { QueueMetadata } from "#types/event";
import { cooldown } from "../../middlewares/cooldown";
import { validate } from "../../middlewares/validate";

export const data = {
  name: Events.InteractionCreate,
};

export async function execute(interaction: BaseInteraction) {
  if (!interaction.inCachedGuild()) return;

  let commandKey: string;
  let command: SlashCommand | ComponentAction | undefined;

  if (interaction.isMessageComponent()) {
    commandKey = interaction.customId;
    command = interaction.client.components.get(commandKey);
  } else if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
    const topLevelName = interaction.commandName;
    const groupName = interaction.options.getSubcommandGroup(false);
    const subCommandName = interaction.options.getSubcommand(false);

    commandKey = [topLevelName, groupName, subCommandName]
      .filter(Boolean)
      .join(" ");

    command =
      interaction.client.commands.get(commandKey) ||
      interaction.client.commands.get(topLevelName);
  } else {
    return;
  }

  if (!command) {
    if (interaction.isChatInputCommand()) {
      return interaction.reply({
        content: `The \`${commandKey}\` command was not found.`,
        flags: MessageFlags.Ephemeral,
      });
    }
    return;
  }

  if (interaction.isAutocomplete()) {
    try {
      const slashCommand = command as SlashCommand;
      if (slashCommand.suggest) {
        await slashCommand.suggest(interaction);
      }
    } catch (error) {
      console.error(error);
    }
    return;
  }

  if (!interaction.isRepliable()) return;

  try {
    if (cooldown(interaction, command)) return;
    if (!validate(interaction, command)) return;

    const player = useMainPlayer();
    const queue = useQueue<QueueMetadata>(interaction.guildId);
    const contextData = { guild: interaction.guild };
    await player.context.provide(contextData, () => {
      if (interaction.isChatInputCommand()) {
        return (command as SlashCommand).execute(
          interaction,
          queue ?? undefined,
        );
      }
      if (interaction.isMessageComponent()) {
        return (command as ComponentAction).execute(
          interaction as ButtonInteraction | StringSelectMenuInteraction,
          queue ?? undefined,
        );
      }
    });
  } catch (err: unknown) {
    console.error(err);
    if (interaction.isRepliable()) {
      const replyFn =
        interaction.deferred || interaction.replied
          ? interaction.followUp.bind(interaction)
          : interaction.reply.bind(interaction);

      const errorMessage = err instanceof Error ? err.message : String(err);

      return replyFn({
        content: codeBlock(errorMessage),
        flags: [MessageFlags.Ephemeral],
      }).catch(() => null);
    }
  }
}
