import { SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "repeat",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  const mode = (queue.repeatMode + 1) % 4;

  queue.setRepeatMode(mode);

  const status = {
    0: "Turned off repeat mode.",
    1: "Now looping the current song.",
    2: "Now looping the entire queue.",
    3: "Autoplay mode activated.",
  }[mode];

  // emit custom event
  queue.emit("repeatChange", queue);

  return interaction.reply({
    embeds: [SuccessEmbed(status)],
  });
}
