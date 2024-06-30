import { GuildQueueEvent } from "discord-player";
import { InfoEmbed } from "../../modules/embeds.js";

export const data = {
  name: GuildQueueEvent.EmptyQueue,
  type: "player",
};

export function execute(queue) {
  const embed = InfoEmbed("No songs left to play.");

  return queue.metadata.channel.send({ embeds: [embed] });
}
