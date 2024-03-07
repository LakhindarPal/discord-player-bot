const glob = require("glob");
const { ApplicationCommandType } = require("discord.js");
const { devGuildId } = require("../../config.json");

module.exports = async function loadCommands(bot) {
  const commandFiles = glob.sync("./src/commands/**/*.js");
  const guild = bot.guilds.cache.get(devGuildId) || (await bot.guilds.fetch(devGuildId));

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
      bot.logger.warn(
        "[COMMANDS]",
        `${command.name} command will not be shown in the help command because no category is set.`
      );
    }

    // register slash commands

    const data = {
      type: ApplicationCommandType.ChatInput,
      name: command.name,
      description: command.description ?? "Empty description",
      options: command.options ?? [],
    };

    if (command.category === "dev" || command.devOnly) {
      await guild.commands.set([data]);
    } else {
      await bot.application?.commands.create(data);
    }

    // debug
    //bot.logger.debug("COMMANDS", `Loaded: ${command.name}`);

    delete require.cache[require.resolve(`../../${file}`)];

    bot.commands.set(command.name, command);
  }
};
