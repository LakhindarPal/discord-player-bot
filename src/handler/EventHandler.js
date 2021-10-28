const glob = require("glob");

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);
    let type = "bot";

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    if (file.includes("player.")) {
      bot.player.on(event.name, event.execute.bind(null, bot));
    } else if (event.once) {
      bot.once(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    bot.logger.info("events", `Loaded ${bot.utils.toCapitalize(type)}: ${event.name}`);
  });
};