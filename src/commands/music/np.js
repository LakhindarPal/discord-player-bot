import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: "np",
  description: "Show the current playing song",
  category: "music",
  queueOnly: true,
};

export function execute(interaction, queue) {
  const track = queue.currentTrack;

  const embed = BaseEmbed()
    .setAuthor({ name: "Nowplaying 🎵" })
    .setTitle(track.title)
    .setURL(track.url)
    .setThumbnail(track.thumbnail)
    .setDescription(
      `Played by: ${track.requestedBy.toString()}\n\n${queue.node.createProgressBar()}`
    );

  return interaction.reply({ ephemeral: true, embeds: [embed] });
}
