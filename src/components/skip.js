import { QueueRepeatMode } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../modules/embeds.js";

export const data = {
  id: "skip",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction, queue) {
  if (queue.isEmpty() && queue.repeatMode !== QueueRepeatMode.AUTOPLAY) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no next song to skip.")],
    });
  }

  queue.node.skip();

  return interaction.reply({
    embeds: [SuccessEmbed("Skipped to the next song.")],
  });
}
