const glob = require("glob");

module.exports = async function loadCommands(bot) {
  const commandFiles = glob.sync("./src/commands/**/*.js");

  for (const file of commandFiles) {
    const command = require(`../../${file}`);

    if (!command.name) {
      throw new TypeError(`[ERROR][COMMANDS]: name is required for commands! (${file})`);
    }

    if (!command.execute) {
      throw new TypeError(
        `[ERROR][COMMANDS]: execute function is required for commands! (${file})`
      );
    }

    if (!command.category) {
      bot.logger.warn("[COMMANDS]", `${command.name} command will not be shown in the help command because no category is set.`);
    }

    const data = {
      name: command.name,
      description: command.description ?? "Empty description",
      options: command.options ?? []
    };

    await bot.application?.commands.create(data);

    // debug
    bot.logger.debug("COMMANDS", `Loaded: ${command.name}`);

    delete require.cache[require.resolve(`../../${file}`)];

    bot.commands.set(command.name, command);
  }
};