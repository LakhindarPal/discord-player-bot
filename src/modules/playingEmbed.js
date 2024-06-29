import { BaseEmbed } from "./embeds.js";

export default (queue, track) => {
  if (!track) track = queue.currentTrack;
  const repeatMode = {
    0: "Off",
    1: "Track",
    2: "Queue",
    3: "Autoplay",
  }[queue.repeatMode];

  const status = `Duration: ${track.duration}  |  Volume:  ${queue.node.volume}%
Repeat: ${repeatMode}  |  Shuffle: ${queue.isShuffling}`;

  return BaseEmbed()
    .setAuthor({
      name: `Now ${queue.node.isPaused() ? "Paused" : "Playing"} | ${queue.size} in queue`,
    })
    .setDescription(
      `${track.toHyperlink()} ~ [${track.requestedBy.toString()}]`
    )
    .setImage(track.thumbnail)
    .setFooter({ text: status });
};
