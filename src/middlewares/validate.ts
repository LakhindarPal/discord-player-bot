import type { GuildMember, RepliableInteraction } from "discord.js";
import { useQueue } from "discord-player";
import replies from "#modules/replies";
import type { ComponentAction } from "#types/action";
import type { SlashCommand } from "#types/command";

export function validate(
  interaction: RepliableInteraction,
  command: SlashCommand | ComponentAction,
) {
  const isComponent = "execute" in command && !("meta" in command);
  const meta = isComponent
    ? (command as ComponentAction).data
    : (command as SlashCommand).meta;

  if (
    meta?.devOnly &&
    !process.env.DEV_USER_IDS?.split(",")
      .map((id) => id.trim())
      .includes(interaction.user.id)
  ) {
    interaction.reply(
      replies.error("This command can only be used by the developers."),
    );
    return false;
  }

  const queue = interaction.guildId ? useQueue(interaction.guildId) : null;

  if (meta?.queueOnly && !queue?.currentTrack) {
    interaction.reply(replies.error("I am not playing anything right now."));
    return false;
  }

  if (meta?.sameVC) {
    const userChannel = (interaction.member as GuildMember)?.voice?.channel;

    if (!userChannel) {
      interaction.reply(
        replies.error("You must join a voice channel to use this command."),
      );
      return false;
    }

    const botChannel = interaction.guild?.members.me?.voice?.channel;
    if (botChannel && botChannel.id !== userChannel.id) {
      interaction.reply(
        replies.error(
          `You must join ${botChannel.toString()} to use this command.`,
        ),
      );
      return false;
    }
  }

  return true;
}
