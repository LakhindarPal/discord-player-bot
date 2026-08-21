import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  Colors,
  ComponentType,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";
import type { Track } from "discord-player";
import { pluralize } from "#modules/utils";

export interface removeModalOptions {
  interaction: ChatInputCommandInteraction;
  tracks: Track[];
  message?: string;
  onConfirm: () => Promise<unknown> | unknown;
  ephemeral?: boolean;
}

export async function removeModal({
  interaction,
  tracks,
  message,
  onConfirm,
  ephemeral = true,
}: removeModalOptions) {
  if (!tracks.length) return;

  const maxDisplay = 10;
  const displayedTracks = tracks.slice(0, maxDisplay);
  const remainingCount = tracks.length - maxDisplay;

  const trackList = displayedTracks
    .map(
      (track, i) => `${i + 1}. ${track.toHyperlink()} (\`${track.duration}\`)`,
    )
    .join("\n");

  const description =
    remainingCount > 0
      ? `${trackList}\n\n*...and ${remainingCount} more ${pluralize(remainingCount, "track")}*`
      : trackList;

  const embed = new EmbedBuilder()
    .setTitle("The following tracks will be removed:")
    .setDescription(description)
    .setColor(Colors.Blurple);

  const confirmBtn = new ButtonBuilder()
    .setCustomId("confirm_remove")
    .setLabel("Confirm")
    .setStyle(ButtonStyle.Danger);

  const cancelBtn = new ButtonBuilder()
    .setCustomId("cancel_remove")
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    confirmBtn,
    cancelBtn,
  );

  const response = await interaction.reply({
    components: [row],
    embeds: [embed],
    ...(ephemeral ? { flags: [MessageFlags.Ephemeral] } : {}),
  });

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    filter: (i) => i.user.id === interaction.user.id,
    time: 60_000,
  });

  collector.on("collect", async (bi: ButtonInteraction) => {
    if (bi.customId === "confirm_remove") {
      await onConfirm();

      const resultMsg =
        message ??
        `Removed **${tracks.length}** ${pluralize(tracks.length, "track")}.`;

      const successEmbed = new EmbedBuilder()
        .setDescription(resultMsg)
        .setColor(Colors.Green);

      await bi.update({
        components: [],
        embeds: [successEmbed],
      });

      collector.stop("confirmed");
    } else if (bi.customId === "cancel_remove") {
      const cancelEmbed = new EmbedBuilder()
        .setDescription("Cancelled. No tracks were removed.")
        .setColor(Colors.DarkOrange);

      await bi.update({
        components: [],
        embeds: [cancelEmbed],
      });

      collector.stop("cancelled");
    }
  });

  collector.on("end", async (_, reason) => {
    if (reason === "time") {
      const timeoutEmbed = new EmbedBuilder()
        .setDescription("Timed out. No tracks were removed.")
        .setColor(Colors.DarkOrange);

      await interaction
        .editReply({
          components: [],
          embeds: [timeoutEmbed],
        })
        .catch(() => {});
    }
  });
}
