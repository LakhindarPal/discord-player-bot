import { QueueRepeatMode } from "discord-player";

const playerOptions = {
  volume: 70,
  repeatMode: QueueRepeatMode.AUTOPLAY,
  noEmitInsert: true,
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60_000,
  leaveOnEnd: true,
  leaveOnEndCooldown: 60_000,
  pauseOnEmpty: true,
  preferBridgedMetadata: true,
  disableBiquad: true,
};

export default playerOptions;
