const { codeBlock } = require("@discordjs/builders");
const { inspect } = require("util");

const classified = [
  "bot.env",
  "bot.config",
  "bot.token",
  "token",
  "process.env",
  'bot["token"]',
  "bot['token']",
  "bot[`token`]"
];

module.exports = {
  name: "eval",
  description: "Execute a piece of javascript code",
  category: "botowner",
  ownerOnly: true,
  usage: "<code>",
  options: [{
    name: "code",
    description: "The code you want to execute",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    const toEval = interaction.options.getString("code", true);

    if (classified.some(item => toEval.toLowerCase().includes(item)))
      return bot.say.errorMessage(interaction, "That operation was cancelled because it may include tokens or secrets.");

    const hasAwait = toEval.includes("await");
    const hasReturn = toEval.includes("return");

    try {
      let evaled = hasAwait ? await eval(`(async () => { ${hasReturn ? " " : "return"} ${toEval} })()`) : eval(toEval);

      const eevaled = typeof evaled;
      evaled = inspect(evaled, {
        depth: 0,
        maxArrayLength: null,
      });

      const type = bot.utils.toCapitalize(eevaled);

      if (eevaled === "object") evaled = JSON.stringify(evaled);

      const embed1 = bot.say.rootEmbed(interaction)
        .setTitle("Eval Command")
        .setDescription(`Eval Type: \`${type}\``);

      const embed2 = bot.say.rootEmbed(interaction)
        .setTitle("Eval Input")
        .setDescription(`${codeBlock("js", toEval)}`);

      const embed3 = bot.say.baseEmbed(interaction)
        .setTitle("Eval Output")
        .setDescription(`${codeBlock("js", evaled)}`);

      return interaction.reply({ embeds: [embed1, embed2, embed3] });
    } catch (error) {
      const wrEmbed = bot.say.baseEmbed(interaction)
        .setTitle("Something went wrong")
        .setDescription(codeBlock(clean(error)));

      return interaction.reply({ embeds: [wrEmbed] });
    }
  }
};

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}
