import { codeBlock } from "discord.js";
import { GuildQueueEvent } from "discord-player";
import { BaseEmbed, Colors } from "../../modules/embeds.js";

export const data = {
  name: GuildQueueEvent.PlayerError,
  type: "player",
};

export function execute(queue, error) {
  const embed = BaseEmbed({ color: Colors.Red })
    .setTitle("An error occured while playing")
    .setDescription(`Reason:\n${codeBlock(error.message)}`);

  return queue.metadata.channel.send({ embeds: [embed] });
}
