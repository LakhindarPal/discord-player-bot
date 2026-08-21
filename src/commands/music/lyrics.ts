import {
  type ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { type GuildQueue, useMainPlayer } from "discord-player";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("lyrics")
  .setDescription("Find lyrics for current or searched track.")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("Track title (defaults to current track).")
      .setRequired(false),
  );

export const meta: CommandMeta = {
  category: "music",
};

export async function execute(
  interaction: ChatInputCommandInteraction,
  queue?: GuildQueue,
) {
  await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

  let query = interaction.options.getString("query", false);

  if (!query && !queue?.currentTrack) {
    return interaction.editReply(
      replies.error("I am not playing anything.", false),
    );
  }

  if (!query && queue?.currentTrack) {
    query = `${queue.currentTrack.author} - ${queue.currentTrack.cleanTitle}`;
  }

  if (!query) {
    return interaction.editReply(
      replies.error("Provide a track title.", false),
    );
  }

  const player = useMainPlayer();
  const results = await player.lyrics.search({ q: query }).catch(() => null);
  const first = results?.[0];

  const lyricsText = first?.plainLyrics;

  if (!first || !lyricsText) {
    return interaction.editReply(replies.error("No lyrics were found.", false));
  }

  const lyrics =
    lyricsText.length > 4096 ? `${lyricsText.slice(0, 4093)}...` : lyricsText;

  const embed = new EmbedBuilder()
    .setTitle(first.trackName || query)
    .setAuthor({
      name: first.artistName || "Unknown Artist",
    })
    .setDescription(lyrics)
    .setColor(Colors.Blurple);

  return interaction.editReply({ embeds: [embed] });
}
