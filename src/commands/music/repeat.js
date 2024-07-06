import { ApplicationCommandOptionType } from "discord.js";
import { QueueRepeatMode } from "discord-player";
import { BaseEmbed, Colors } from "../../modules/embeds.js";

export const data = {
  name: "repeat",
  description: "Get or set repeat mode",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "status",
      description: "Show the current repeat mode.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "off",
      description: "Disable repeat mode.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "queue",
      description: "Repeat the entire queue.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "song",
      description: "Repeat the current song.",
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "autoplay",
      description: "Automatically play related songs based on your queue.",
    },
  ],
  category: "music",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const subCmd = interaction.options.getSubcommand(true);

  let description;
  switch (subCmd) {
    case "off":
      queue.setRepeatMode(QueueRepeatMode.OFF);
      description = "Turned off repeat mode.";
      break;
    case "song":
      queue.setRepeatMode(QueueRepeatMode.TRACK);
      description = "Now looping the current song.";
      break;
    case "queue":
      queue.setRepeatMode(QueueRepeatMode.QUEUE);
      description = "Now looping the entire queue.";
      break;
    case "autoplay":
      queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
      description = "Autoplay mode activated.";
      break;
    default: {
      const status = {
        0: "Off",
        1: "Track",
        2: "Queue",
        3: "Autoplay",
      }[queue.repeatMode];

      description = `Playback repeat status: \`${status}\`.`;
    }
  }

  // emit custom event
  queue.emit("repeatChange", queue);

  return interaction.reply({
    ephemeral: subCmd === "status",
    embeds: [
      BaseEmbed()
        .setDescription(description)
        .setColor(subCmd === "status" ? Colors.Blurple : Colors.Green),
    ],
  });
}
