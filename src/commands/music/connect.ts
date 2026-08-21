import {
  ChannelType,
  type ChatInputCommandInteraction,
  type GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import { useMainPlayer } from "discord-player";
import playerOptions from "#constants/player-options";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("connect")
  .setDescription("Connect me to your voice channel.");

export const meta: CommandMeta = {
  category: "music",
};

export async function execute(interaction: ChatInputCommandInteraction) {
  const guild = interaction.guild;
  if (!guild) return;

  if (guild.members.me?.voice.channel) {
    return interaction.reply(
      replies.error("I am already connected to a voice channel."),
    );
  }

  const member = interaction.member as GuildMember | null;
  const channel = member?.voice?.channel;

  if (!channel) {
    return interaction.reply(
      replies.error("You need to join a voice channel first."),
    );
  }

  if (!channel.viewable) {
    return interaction.reply(
      replies.error("I need the `View Channel` permission."),
    );
  }

  if (!channel.joinable) {
    return interaction.reply(replies.error("I need the `Connect` permission."));
  }

  if (channel.type === ChannelType.GuildVoice && !channel.speakable) {
    return interaction.reply(replies.error("I need the `Speak` permission."));
  }

  if (channel.full) {
    return interaction.reply(
      replies.error("Cannot join, the channel is full."),
    );
  }

  try {
    const player = useMainPlayer();
    const queue = player.nodes.create(guild.id, {
      ...playerOptions,
      metadata: { channel: interaction.channel },
      selfDeaf: true,
    });

    await queue.connect(channel);

    return interaction.reply(replies.success("Connected.", true));
  } catch (error) {
    console.error(error);

    return interaction.reply(
      replies.error("Failed to connect to the voice channel."),
    );
  }
}
