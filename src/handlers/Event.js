const glob = require("glob");

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");

  for (const file of eventFiles) {
    const event = require(`../../${file}`);

    let type = "bot";
    if (file.includes("player.")) type = "player";

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    if (type === "player") {
      const { useMasterPlayer } = require("discord-player");
      const player = useMasterPlayer();

      player.events.on(event.name, event.execute.bind(null, bot));
    } else if (event.once) {
      bot.once(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    // bot.logger.debug("EVENTS", `Loaded ${type}: ${event.name}`);
  }
};
