const { ApplicationCommandOptionType } = require("discord.js");
const { useQueue, useMasterPlayer } = require("discord-player");

module.exports = {
  name: "play",
  description: "Play a track or playlist from url or name",
  category: "music",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "track",
      description: "The track name/url, you want to play.",
      required: true,
    },
  ],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("track", true);

    const player = useMasterPlayer();
    const queue = useQueue(interaction.guild.id);

    const channel = interaction.member?.voice?.channel;

    if (!channel) return bot.say.wrongEmbed(interaction, "You have to join a voice channel first.");

    if (queue && queue.channel.id !== channel.id)
      return bot.say.wrongEmbed(interaction, "I'm already playing in a different voice channel!");

    if (!channel.viewable)
      return bot.say.wrongEmbed(interaction, "I need `View Channel` permission.");

    if (!channel.joinable)
      return bot.say.wrongEmbed(interaction, "I need `Connect Channel` permission.");

    if (channel.full)
      return bot.say.wrongEmbed(interaction, "Can't join, the voice channel is full.");

    if (interaction.member.voice.deaf)
      return bot.say.wrongEmbed(interaction, "You cannot run this command while deafened.");

    if (interaction.guild.members.me?.voice?.mute)
      return bot.say.wrongEmbed(interaction, "Please unmute me before playing.");

    const searchResult = await player
      .search(query, { requestedBy: interaction.user })
      .catch(() => null);

    if (!searchResult?.hasTracks())
      return bot.say.wrongEmbed(interaction, `No track was found for ${query}!`);

    try {
      await player.play(channel, searchResult, {
        nodeOptions: {
          metadata: interaction.channel,
        },
      });

      return bot.say.successEmbed(interaction, `Loading your track`);
    } catch (e) {
      return bot.say.errorEmbed(interaction, `Something went wrong: ${e.message}`);
    }
  },
};
