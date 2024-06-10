import { codeBlock } from "discord.js";
import { GuildQueueEvent } from "discord-player";
import { BaseEmbed, Colors } from "../../modules/Embeds.js";

export const data = {
  name: GuildQueueEvent.Error,
  type: "player",
};
export async function execute(queue, error) {
  console.error(error);

  const embed = BaseEmbed({ color: Colors.Red })
    .setTitle("An error occured")
    .setDescription(`Reason:\n${codeBlock(error.message)}`);

  return queue.metadata.channel.send({ embeds: [embed] });
}
