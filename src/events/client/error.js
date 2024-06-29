import { Events } from "discord.js";

export const data = {
  name: Events.Error,
};

export function execute(err) {
  console.error(err);
}
