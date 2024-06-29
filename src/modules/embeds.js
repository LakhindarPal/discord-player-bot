import { Colors, EmbedBuilder } from "discord.js";

export { Colors };

/**
 * Creates a base embed with the given data and color.
 *
 * @param {Object} [params={}] - The parameters for the embed.
 * @param {import('discord.js').EmbedData} [params.data={}] - The data for the embed.
 * @param {string} [params.color=Colors.Blurple] - The color of the embed.
 * @returns {EmbedBuilder} The configured embed.
 */
export const BaseEmbed = ({ data = {}, color = Colors.Blurple } = {}) =>
  new EmbedBuilder(data).setColor(color);

/**
 * Creates an error embed.
 * @param {string} text - The description text for the embed.
 * @returns {EmbedBuilder} The created embed with red color.
 */
export const ErrorEmbed = (text) =>
  BaseEmbed({ data: { description: text }, color: Colors.Red });

/**
 * Creates a success embed.
 * @param {string} text - The description text for the embed.
 * @returns {EmbedBuilder} The created embed with green color.
 */
export const SuccessEmbed = (text) =>
  BaseEmbed({ data: { description: text }, color: Colors.Green });

/**
 * Creates a warning embed.
 * @param {string} text - The description text for the embed.
 * @returns {EmbedBuilder} The created embed with dark orange color.
 */
export const WarningEmbed = (text) =>
  BaseEmbed({ data: { description: text }, color: Colors.DarkOrange });

/**
 * Creates an informational embed.
 * @param {string} text - The description text for the embed.
 * @returns {EmbedBuilder} The created embed with blurple color.
 */
export const InfoEmbed = (text) =>
  BaseEmbed({ data: { description: text }, color: Colors.Blurple });
