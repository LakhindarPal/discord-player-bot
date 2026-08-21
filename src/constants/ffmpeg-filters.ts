import type { FiltersName } from "discord-player";

export interface FilterChoice {
  name: string;
  value: FiltersName;
}

export const ffmpegFilters: FilterChoice[] = [
  { name: "8D", value: "8D" },
  { name: "Bassboost", value: "bassboost" },
  { name: "Chorus", value: "chorus" },
  { name: "Dim", value: "dim" },
  { name: "Earrape", value: "earrape" },
  { name: "Fadein", value: "fadein" },
  { name: "Flanger", value: "flanger" },
  { name: "Gate", value: "gate" },
  { name: "Haas", value: "haas" },
  { name: "Karaoke", value: "karaoke" },
  { name: "Lofi", value: "lofi" },
  { name: "Mcompand", value: "mcompand" },
  { name: "Mono", value: "mono" },
  { name: "Nightcore", value: "nightcore" },
  { name: "Normalizer", value: "normalizer" },
  { name: "Phaser", value: "phaser" },
  { name: "Pulsator", value: "pulsator" },
  { name: "Reverse", value: "reverse" },
  { name: "Softlimiter", value: "softlimiter" },
  { name: "Subboost", value: "subboost" },
  { name: "Surrounding", value: "surrounding" },
  { name: "Treble", value: "treble" },
  { name: "Tremolo", value: "tremolo" },
  { name: "Vaporwave", value: "vaporwave" },
  { name: "Vibrato", value: "vibrato" },
];

export default ffmpegFilters;
