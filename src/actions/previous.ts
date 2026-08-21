import { type ButtonInteraction, MessageFlags } from "discord.js";
import { type GuildQueue, useHistory } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "previous",
  queueOnly: true,
  sameVC: true,
};

export async function execute(
  interaction: ButtonInteraction,
  _queue: GuildQueue<QueueMetadata>,
) {
  const history = useHistory();
  if (history?.isEmpty()) {
    return interaction.reply(replies.error("No played tracks found."));
  }

  await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

  await history?.previous();

  return interaction.editReply(
    replies.success("Skipped to the previous track."),
  );
}
