/* eslint-disable no-eval */
const classified = ["env", "token", "config", "secret", "process"];
const { codeBlock, ApplicationCommandOptionType } = require("discord.js");
const { inspect } = require("node:util");

module.exports = {
  name: "eval",
  description: "Execute a piece of javascript code",
  category: "dev",
  devOnly: true,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "code",
      description: "The code to execute",
      required: true,
    },
  ],
  async execute(bot, interaction) {
    const toEval = interaction.options.getString("code", true);

    if (classified.some((item) => toEval.toLowerCase().includes(item)))
      return interaction.reply({
        content: "This operation is cancelled because it may include secrets.",
      });

    const evaluateCode = async (code) => {
      try {
        const result = eval(code);
        const output = result instanceof Promise ? await result : result;

        if (typeof output !== "string") {
          return inspect(output, { depth: 0 });
        }

        return output;
      } catch (err) {
        return err.stack;
      }
    };

    const startTimestamp = process.hrtime.bigint();
    const evalResult = await evaluateCode(toEval);
    const endTimestamp = process.hrtime.bigint();
    const executionTime = Number((endTimestamp - startTimestamp) / BigInt(1e6));

    const embed1 = {
      title: "Eval Command",
      footer: { text: `Execution time: ${executionTime}` },
    };

    const embed2 = {
      title: "Code",
      description: `${codeBlock("js", toEval)}`,
    };

    const embed3 = {
      title: "Result",
      description: `${codeBlock("js", evalResult)}`,
    };

    return interaction.reply({
      ephemeral: true,
      embeds: [embed1, embed2, embed3],
    });
  },
};
