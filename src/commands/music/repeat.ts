import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, QueueRepeatMode } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";
import type { QueueMetadata } from "#types/event";

export const data = new SlashCommandBuilder()
  .setName("repeat")
  .setDescription("Configure or view the repeat mode.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("status")
      .setDescription("View the current repeat mode."),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("off").setDescription("Disable repeat mode."),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("queue").setDescription("Repeat the entire queue."),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("track").setDescription("Repeat the current track."),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("autoplay")
      .setDescription("Enable autoplay for recommended tracks."),
  );

export const meta: CommandMeta = {
  category: "music",
  queueOnly: true,
  sameVC: true,
};

export function execute(
  interaction: ChatInputCommandInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const subCmd = interaction.options.getSubcommand(true);

  if (subCmd === "status") {
    const statuses = ["Off", "Track", "Queue", "Autoplay"];
    const status = statuses[queue.repeatMode];
    const reply = replies.info(`Current repeat mode: \`${status}\`.`, true);
    return interaction.reply(reply);
  }

  const repeatModes = {
    autoplay: {
      message: "Autoplay mode activated.",
      value: QueueRepeatMode.AUTOPLAY,
    },
    off: {
      message: "Disabled repeat mode.",
      value: QueueRepeatMode.OFF,
    },
    queue: {
      message: "Repeating the entire queue.",
      value: QueueRepeatMode.QUEUE,
    },
    track: {
      message: "Repeating the current track.",
      value: QueueRepeatMode.TRACK,
    },
  } as const;

  type RepeatMode = keyof typeof repeatModes;
  const mode = repeatModes[subCmd as RepeatMode];

  queue.setRepeatMode(mode.value);
  queue.emit("repeatChange", queue);

  return interaction.reply(replies.success(mode.message));
}
