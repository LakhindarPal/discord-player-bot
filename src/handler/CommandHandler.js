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

    if (command.name.trim() === "") {
      throw new TypeError(`[ERROR][COMMANDS]: name cannot be empty! (${file})`);
    }

    const data = {
      name: command.name,
      description: command?.description ?? "Empty description",
      options: command?.options ?? []
    };

    await bot.application?.commands.create(data);

    delete require.cache[require.resolve(`../../${file}`)];

    bot.commands.set(command.name, command);

    // debug
    bot.logger.log("commands", `Loaded Command: ${command.name}`);
  }
};
