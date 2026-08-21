import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { type GuildQueue, QueueRepeatMode } from "discord-player";
import type { QueueMetadata } from "#types/event";

export default function buttons(
  queue: GuildQueue<QueueMetadata>,
): ActionRowBuilder<ButtonBuilder>[] {
  const volume = queue.node.volume;

  const repeatConfig: Record<number, { emoji: string; style: ButtonStyle }> = {
    [QueueRepeatMode.OFF]: { emoji: "🔁", style: ButtonStyle.Secondary },
    [QueueRepeatMode.TRACK]: { emoji: "🔂", style: ButtonStyle.Success },
    [QueueRepeatMode.QUEUE]: { emoji: "🔁", style: ButtonStyle.Success },
    [QueueRepeatMode.AUTOPLAY]: { emoji: "♾️", style: ButtonStyle.Success },
  };

  const repeatState = repeatConfig[queue.repeatMode] ?? {
    emoji: "🔁",
    style: ButtonStyle.Secondary,
  };

  const playBtn = new ButtonBuilder()
    .setCustomId("play_pause")
    .setEmoji(queue.node.isPaused() ? "▶️" : "⏸️")
    .setStyle(ButtonStyle.Primary);

  const prevBtn = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji("⏮️")
    .setStyle(ButtonStyle.Secondary);

  const nextBtn = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("⏭️")
    .setStyle(ButtonStyle.Secondary);

  const stopBtn = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji("⏹️")
    .setStyle(ButtonStyle.Danger);

  const muteBtn = new ButtonBuilder()
    .setCustomId("mute")
    .setEmoji(volume === 0 ? "🔊" : "🔇")
    .setStyle(ButtonStyle.Secondary);

  const saveBtn = new ButtonBuilder()
    .setCustomId("save")
    .setEmoji("💟")
    .setStyle(ButtonStyle.Secondary);

  const shuffleBtn = new ButtonBuilder()
    .setCustomId("shuffle")
    .setEmoji("🔀")
    .setStyle(queue.isShuffling ? ButtonStyle.Success : ButtonStyle.Secondary);

  const repeatBtn = new ButtonBuilder()
    .setCustomId("repeat")
    .setEmoji(repeatState.emoji)
    .setStyle(repeatState.style);

  const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    playBtn,
    prevBtn,
    nextBtn,
    stopBtn,
  );
  const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    muteBtn,
    shuffleBtn,
    repeatBtn,
    saveBtn,
  );

  return [row1, row2];
}
