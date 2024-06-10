import { GuildQueueEvent } from "discord-player";
import { BaseEmbed } from "../../modules/Embeds.js";

export const data = {
  name: GuildQueueEvent.PlayerStart,
  type: "player",
};
export async function execute(queue, track) {
  if (!track.requestedBy) track.requestedBy = queue.player.client.user;

  const embed = BaseEmbed()
    .setAuthor({ name: "Now playing" })
    .setTitle(track.title)
    .setURL(track.url)
    .setThumbnail(track.thumbnail)
    .setFooter({
      text: `Played by: ${track.requestedBy.tag}`,
      iconURL: track.requestedBy.displayAvatarURL(),
    });

  return queue.metadata.channel.send({ embeds: [embed] });
}
