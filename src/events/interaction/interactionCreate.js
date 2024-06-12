import { Collection, Events } from "discord.js";
import { useQueue } from "discord-player";
import { ErrorEmbed, WarningEmbed } from "../../modules/Embeds.js";

export const data = {
  name: Events.InteractionCreate,
};
export async function execute(interaction) {
  if (!interaction.inCachedGuild()) return;

  const commandName = interaction.commandName;
  const command = interaction.client.commands.get(commandName);

  if (!command) {
    return console.error(
      `No command matching \`${interaction.commandName}\` was found.`
    );
  }

  if (interaction.isAutocomplete()) {
    try {
      await command.suggest(interaction);
    } catch (error) {
      console.error(error);
    }
  }

  if (!interaction.isChatInputCommand()) return;

  const { cooldowns } = interaction.client;

  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const defaultCooldownDuration = 3;
  const cooldownAmount =
    (command.data.cooldown ?? defaultCooldownDuration) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000);
      return interaction.reply({
        embeds: [
          WarningEmbed(
            `Please wait, you are on a cooldown for \`${commandName}\` command.
You can use it again <t:${expiredTimestamp}:R>.`
          ),
        ],
        ephemeral: true,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  if (
    (command.data.devOnly || command.data.category === "dev") &&
    !process.env.DEV_IDS.split(",").includes(interaction.user.id)
  ) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("This command is for developers only!")],
    });
  }

  const queue = useQueue(interaction.guildId);
  if (command.data.queueOnly && !queue?.isPlaying()) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("I am not playing anything right now!")],
    });
  }

  if (command.data.validateVC) {
    const selfChannel = interaction.guild.members.me?.voice?.channel;
    const memberChannel = interaction.member.voice?.channel;

    if (!selfChannel && !memberChannel) {
      return interaction.reply({
        ephemeral: true,
        embeds: [
          WarningEmbed("You must join a voice channel to use this command!"),
        ],
      });
    }

    if (selfChannel && selfChannel.id !== memberChannel?.id) {
      return interaction.reply({
        ephemeral: true,
        embeds: [
          ErrorEmbed(
            `You must join ${selfChannel.toString()} channel to use this command.`
          ),
        ],
      });
    }
  }

  try {
    await command.execute(interaction, queue);
  } catch (err) {
    console.error(err);

    let replyMethod = "reply";
    if (interaction.replied || interaction.deferred) replyMethod = "followUp";
    return interaction[replyMethod]({
      ephemeral: true,
      embeds: [ErrorEmbed("There was an error while executing this command!")],
    });
  }
}
