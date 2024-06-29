import { time } from "discord.js";
import { BaseEmbed } from "../../modules/embeds.js";
import { Util } from "discord-player";

export const data = {
  name: "uptime",
  description: "Show how long the bot has been up",
  category: "misc",
};

export function execute(interaction) {
  const client = interaction.client;
  const upTime = Util.formatDuration(client.uptime);
  const upSince = new Date(Date.now() - client.uptime);

  const embed = BaseEmbed()
    .setAuthor({
      name: client.user.tag,
      iconURL: client.user.displayAvatarURL(),
    })
    .setDescription(
      `**Up since:** ${time(upSince, "F")}
**Time:** ${upTime}`
    );

  return interaction.reply({ ephemeral: true, embeds: [embed] });
}
