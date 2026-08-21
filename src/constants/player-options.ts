import { type GuildNodeCreateOptions, QueueRepeatMode } from "discord-player";

const options: GuildNodeCreateOptions = {
  disableBiquad: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60_000,
  leaveOnEnd: true,
  leaveOnEndCooldown: 60_000,
  leaveOnStop: false,
  noEmitInsert: true,
  pauseOnEmpty: true,
  preferBridgedMetadata: true,
  repeatMode: QueueRepeatMode.AUTOPLAY,
  volume: 100,
};

export default options;
