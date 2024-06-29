import { GuildQueueEvent } from "discord-player";
import { InfoEmbed } from "../../modules/embeds.js";

export const data = {
  name: GuildQueueEvent.EmptyChannel,
  type: "player",
};

export function execute(queue) {
  const embed = InfoEmbed("Feeling lonely, leaving now.");

  return queue.metadata.channel.send({ embeds: [embed] });
}
