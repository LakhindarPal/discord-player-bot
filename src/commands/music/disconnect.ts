import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("disconnect")
  .setDescription("Disconnect me from the voice channel.");

export const meta: CommandMeta = {
  category: "music",
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue?: GuildQueue<QueueMetadata>,
) {
  if (queue && !queue.deleted) {
    queue.delete();
  } else {
    const me = interaction.guild?.members.me;
    if (me?.voice?.channel) {
      me.voice.disconnect();
    }
  }

  return interaction.reply(
    replies.success("Disconnected from the voice channel."),
  );
}
