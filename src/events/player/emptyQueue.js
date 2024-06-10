import { GuildQueueEvent } from "discord-player";
import { InfoEmbed } from "../../modules/Embeds.js";

export const data = {
  name: GuildQueueEvent.EmptyQueue,
  type: "player",
};
export function execute(queue) {
  const embed = InfoEmbed("No more songs to play, leaving now.");

  return queue.metadata.channel.send({ embeds: [embed] });
}
