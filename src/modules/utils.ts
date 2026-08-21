import { type Client, OAuth2Scopes, PermissionFlagsBits } from "discord.js";

/**
 * Formats a number into a locale-specific string representation.
 * @param {number} number The number to format.
 * @param {string} locale The targeted locale.
 * @returns {string} The formatted number string.
 */
export function localeNumber(number: number, locale: string = "en-IN"): string {
  return number.toLocaleString(locale, { style: "decimal" });
}

/**
 * Returns the singular or plural form of a word based on the count.
 * @param {number} count - The count.
 * @param {string} singular - The singular form of the word.
 * @param {string} [plural] - The optional custom plural form of the word.
 * @returns {string} The singular or plural word.
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

/**
 * Converts a time string in "hh:mm:ss", "mm:ss", or "ss" format to milliseconds.
 * @param {string} time - The time string to convert.
 * @returns {number | null} - The equivalent time in milliseconds, or null if input is invalid.
 */
export function timeToMs(time: string = "0"): number | null {
  if (
    typeof time !== "string" ||
    !/^\d{1,2}(:\d{1,2}){0,2}$/.test(time.trim())
  ) {
    return null;
  }

  const parts = time.trim().split(":").map(Number).reverse();
  const [seconds = 0, minutes = 0, hours = 0] = parts;

  if (Number.isNaN(seconds) || Number.isNaN(minutes) || Number.isNaN(hours)) {
    return null;
  }

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

/**
 * Converts a string to title case, replacing hyphens and underscores with spaces.
 * @param {string} word - The word to convert.
 * @returns {string} - The word in title case.
 */
export function titleCase(word: string): string {
  if (!word) return "";

  return word
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

/**
 * Generates an OAuth2 invite link for the bot with required scopes and permissions.
 * @param {Client} client - The Discord client instance.
 * @returns {string} The generated bot invite URL.
 */
export function inviteUrl(client: Client): string {
  return client.generateInvite({
    permissions: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
      PermissionFlagsBits.UseExternalEmojis,
    ],
    scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
  });
}
