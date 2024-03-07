const { Events, PermissionsBitField, Collection } = require("discord.js");
const { botDevIds } = require("../../../config.json");

module.exports = {
  name: Events.InteractionCreate,
  async execute(bot, interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;

    try {
      const cmdArg = interaction.commandName;
      const command = bot.commands.get(cmdArg);

      if (!command) return;
      if (!interaction.commandId) return;

      const userId = interaction.user.id;
      const { cooldowns } = bot;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(userId)) {
        const expirationTime = timestamps.get(userId) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);

          return interaction.reply({
            content: `You are on a cooldown for this command. You can use it again <t:${expiredTimestamp}:R>.`,
            ephemeral: true,
          });
        }
      }

      timestamps.set(userId, now);
      setTimeout(() => timestamps.delete(userId), cooldownAmount);

      if (
        !interaction.channel
          .permissionsFor(interaction.guild.members.me)
          .has(PermissionsBitField.Flags.EmbedLinks)
      )
        return interaction.reply({
          content: "I need **`Embed Links`** permission.",
          ephemeral: true,
        });

      if ((command.category === "dev" || command.devOnly === true) && !botDevIds.includes(userId)) {
        return interaction.reply({
          content: "This command can only be used by the bot developers.",
          ephemeral: true,
        });
      }

      if (command.category === "music" && command.name !== "play") {
        const { useQueue } = require("discord-player");
        const queue = useQueue(interaction.guild.id);

        if (!queue)
          return interaction.reply({
            content: "I’m currently not playing in this server.",
            ephemeral: true,
          });

        const memberChannelId = interaction.member?.voice?.channelId;
        const queueChannelId = queue?.channel.id;

        if (!memberChannelId)
          return interaction.reply({
            content: "You need to join a voice channel first!",
            ephemeral: true,
          });

        if (memberChannelId !== queueChannelId)
          return interaction.reply({
            content: "You must be in the same voice channel as me!",
            ephemeral: true,
          });

        await command.execute(bot, interaction, queue);
      } else {
        await command.execute(bot, interaction);
      }
    } catch (error) {
      bot.utils.sendErrorLog(bot, error, "error");

      if (interaction.deferred) return interaction.editReply({ content: `${error.message}` });

      if (interaction.replied)
        return interaction.followUp({ content: `${error.message}`, ephemeral: true });

      return interaction.reply({ content: `${error.message}`, ephemeral: true });
    }
  },
};
