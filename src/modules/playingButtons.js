import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default (queue) => {
  const playBtn = new ButtonBuilder()
    .setCustomId("play")
    .setEmoji(queue.node.isPaused() ? "▶️" : "⏸️")
    .setStyle(ButtonStyle.Secondary);

  const backBtn = new ButtonBuilder()
    .setCustomId("back")
    .setEmoji("⏮️")
    .setStyle(ButtonStyle.Secondary);

  const skipBtn = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji("⏭️")
    .setStyle(ButtonStyle.Secondary);

  const stopBtn = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji("⏹️")
    .setStyle(ButtonStyle.Danger);

  const voldownBtn = new ButtonBuilder()
    .setCustomId("voldown")
    .setEmoji("🔉")
    .setStyle(ButtonStyle.Secondary);

  const volupBtn = new ButtonBuilder()
    .setCustomId("volup")
    .setEmoji("🔊")
    .setStyle(ButtonStyle.Secondary);

  const shuffleBtn = new ButtonBuilder()
    .setCustomId("shuffle")
    .setEmoji("🔀")
    .setStyle(ButtonStyle.Secondary);

  const repeatBtn = new ButtonBuilder()
    .setCustomId("repeat")
    .setEmoji("🔁")
    .setStyle(ButtonStyle.Secondary);

  const row1 = new ActionRowBuilder().addComponents(
    playBtn,
    backBtn,
    skipBtn,
    stopBtn
  );
  const row2 = new ActionRowBuilder().addComponents(
    voldownBtn,
    volupBtn,
    shuffleBtn,
    repeatBtn
  );

  return [row1, row2];
};
