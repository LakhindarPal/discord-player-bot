import type { ButtonInteraction } from "discord.js";
import type { GuildQueue } from "discord-player";
import replies from "#modules/replies";
import type { ActionData } from "#types/action";
import type { QueueMetadata } from "#types/event";

export const data: ActionData = {
  id: "save",
  queueOnly: true,
};

export async function execute(
  interaction: ButtonInteraction,
  queue: GuildQueue<QueueMetadata>,
) {
  const track = queue.currentTrack;
  if (!track) {
    return interaction.reply(
      replies.error("No currently playing track found.", true),
    );
  }
  try {
    await interaction.user.send({ content: track.url });
    return interaction.reply(
      replies.success("Sent you the song in your DMs.", true),
    );
  } catch {
    return interaction.reply(
      replies.error(
        "Failed to DM you the song. Please check your privacy settings.",
      ),
    );
  }
}
