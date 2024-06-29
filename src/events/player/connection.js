import { GuildQueueEvent } from "discord-player";
import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: GuildQueueEvent.Connection,
  type: "player",
};

export function execute(queue) {
  const textChannel = queue.metadata.channel;

  const embed = BaseEmbed()
    .setAuthor({
      name: queue.player.client.user.username,
      iconURL: queue.player.client.user.displayAvatarURL(),
    })
    .setDescription(
      `👍 Joined ${queue.channel.toString()} and 📄 bouned ${textChannel.toString()}`
    );

  return textChannel.send({ embeds: [embed] });
}
