/**
 * Formats a duration of time into a human-readable format.
 * @param {number} duration The time in milliseconds.
 * @returns {string} The formatted duration string.
 */
export function formatDuration(duration) {
  if (isNaN(duration)) duration = 0;
  const round = duration > 0 ? Math.floor : Math.ceil;

  const timeUnits = [
    { label: "day", value: round(duration / (1000 * 60 * 60 * 24)) },
    { label: "hour", value: round((duration / (1000 * 60 * 60)) % 24) },
    { label: "minute", value: round((duration / (1000 * 60)) % 60) },
    { label: "second", value: round((duration / 1000) % 60) },
  ];

  return timeUnits
    .filter((unit) => unit.value > 0)
    .map((unit) => `${unit.value} ${unit.label}${unit.value !== 1 ? "s" : ""}`)
    .join(" ");
}

/**
 * Formats a number into a human-readable format.
 * @param {number} number The number to format.
 * @returns {string} The formatted number string.
 */
export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
