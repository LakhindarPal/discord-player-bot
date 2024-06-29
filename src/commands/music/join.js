import { useMainPlayer } from "discord-player";
import {
  ErrorEmbed,
  SuccessEmbed,
  WarningEmbed,
} from "../../modules/embeds.js";
import playerOptions from "../../config/playerOptions.js";

export const data = {
  name: "join",
  description: "Let the bot join your voice channel.",
  category: "music",
};

export async function execute(interaction) {
  const { guild, member, reply } = interaction;
  const selfChannel = guild.members.me?.voice?.channel;
  const memberChannel = member.voice?.channel;

  if (selfChannel) {
    return reply({
      ephemeral: true,
      embeds: [ErrorEmbed("I'm already in a voice channel.")],
    });
  }

  if (!memberChannel) {
    return reply({
      ephemeral: true,
      embeds: [ErrorEmbed("You need to join a voice channel first!")],
    });
  }

  if (selfChannel?.id === memberChannel.id) {
    return reply({
      ephemeral: true,
      embeds: [
        WarningEmbed(`I'm already in the ${selfChannel.toString()} channel.`),
      ],
    });
  }

  try {
    const player = useMainPlayer();
    const queue = player.queues.create(guild.id, {
      ...playerOptions,
      metadata: interaction,
      selfDeaf: true,
    });

    await queue.connect(memberChannel);

    return reply({
      embeds: [SuccessEmbed(`Joined the ${memberChannel.toString()} channel.`)],
    });
  } catch (error) {
    console.error(error);

    return reply({
      ephemeral: true,
      embeds: [
        ErrorEmbed(
          "There was an error joining the voice channel. Please try again."
        ),
      ],
    });
  }
}
