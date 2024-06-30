import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default (queue) => {
  if (!queue.size) return null;

  const menu = new StringSelectMenuBuilder()
    .setCustomId("songs_menu")
    .setPlaceholder(`${queue.size} songs in queue`)
    .addOptions(
      queue.tracks.data
        .slice(0, 25)
        .map((song, index) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(song.title)
            .setValue(index.toString())
        )
    );

  const row = new ActionRowBuilder().addComponents(menu);
  return row;
};
