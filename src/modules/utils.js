/**
 * Formats a number into a locale-specific string representation.
 * @param {number} number The number to format.
 * @returns {string} The formatted number string.
 */
export function formatNumber(number) {
  return number.toLocaleString("en-IN", { style: "decimal" });
}

/**
 * Converts a string to title case.
 * @param {string} str - The input string to be converted to title case.
 * @returns {string} The input string converted to title case.
 */
export function titleCase(str) {
  if (!str) return "";

  return str
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase());
}
