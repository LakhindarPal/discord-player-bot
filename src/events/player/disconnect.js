import { GuildQueueEvent } from "discord-player";
import { InfoEmbed } from "../../modules/Embeds.js";

export const data = {
  name: GuildQueueEvent.Disconnect,
  type: "player",
};
export function execute(queue) {
  const embed = InfoEmbed("Looks like my job here is done, leaving now.");

  return queue.metadata.channel.send({ embeds: [embed] });
}
