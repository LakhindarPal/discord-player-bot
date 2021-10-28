const DJS = require("discord.js");

/**
 * Returns a custom embed
 * @param {(DJS.Interaction|DJS.Guild|import("discord.player").Queue|string)} [resolvable]
 */
function baseEmbed(resolvable) {
  let colour = "#00FFFF";
  if (resolvable && typeof resolvable === "string") colour = resolvable;
  if (resolvable && typeof resolvable === "object") colour = ("guild" in resolvable ? resolvable.guild : resolvable)?.me?.displayColor || "#00FFFF";

  return new DJS.MessageEmbed()
    .setColor(colour);
}


/**
 * Reply a custom embed to interaction
 * @param {DJS.Interaction} interaction
 * @param {string} text
 * @param {boolean} [ephemeral=false]
 */
function successMessage(interaction, text, ephemeral = false) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (successMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (successMessage)");
  }

  const embedS = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor(interaction.guild.me.displayColor || "#00FFFF");

  if (interaction.deferred || interaction.replied) {
    return interaction.editReply({ embeds: [embedS] }).catch(console.error);
  } else {
    return interaction.reply({ ephemeral, embeds: [embedS] }).catch(console.error);
  }
}

/**
 * Reply a custom embed to interaction
 * @param {DJS.Interaction} interaction
 * @param {string} text
 */
function warnMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (warnMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (warnMessage)");
  }

  const embedW = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor("ORANGE");

  if (interaction.deferred || interaction.replied) {
    return interaction.editReply({ embeds: [embedW] }).catch(console.error);
  } else {
    return interaction.reply({ ephemeral: true, embeds: [embedW] }).catch(console.error);
  }
}

/**
 * Reply a custom embed to interaction
 * @param {DJS.Interaction} interaction
 * @param {string} text
 */
function errorMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (errorMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (errorMessage)");
  }

  const embedE = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor("RED");

  if (interaction.deferred || interaction.replied) {
    return interaction.editReply({ embeds: [embedE] }).catch(console.error);
  } else {
    return interaction.reply({ ephemeral: true, embeds: [embedE] }).catch(console.error);
  }
}


/**
 * Send a custom embed to queue textChannel
 * @param {import("discord.player").Queue} queue
 * @param {string} text
 * @param {string | number} [color]
 */
function queueMessage(queue, text, color) {
  if (!queue) {
    throw Error("'queue' must be passed down as param! (queueMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (queueMessage)");
  }

  const { havePermissions } = require("./Util");
  if (!havePermissions(queue.metadata.channel)) return;

  let colour = queue.guild.me.displayColor || "#00FFFF";
  if (color) colour = color;

  const embedQ = new DJS.MessageEmbed()
    .setDescription(text)
    .setColor(colour);

  return queue.metadata.channel.send({ embeds: [embedQ] });
}

module.exports = {
  baseEmbed,
  successMessage,
  warnMessage,
  errorMessage,
  queueMessage
};