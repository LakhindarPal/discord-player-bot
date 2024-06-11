import { codeBlock, ApplicationCommandOptionType, Colors } from "discord.js";
import { inspect } from "node:util";
import { ErrorEmbed } from "../../modules/Embeds.js";

export const data = {
  name: "eval",
  description: "Execute a piece of javascript code",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "code",
      description: "The code to execute",
      required: true,
    },
  ],
  category: "dev",
  devOnly: true,
};

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const code = interaction.options.getString("code", true);

  // Security check to prevent execution of potentially harmful code
  const classified = ["env", "token", "config", "secret", "process"];
  if (classified.some((item) => code.toLowerCase().includes(item))) {
    return interaction.editReply({
      embeds: [
        ErrorEmbed(
          "This operation is cancelled because it may include secrets."
        ),
      ],
    });
  }

  let result;
  let error;
  let executionTime;

  try {
    const startTimestamp = process.hrtime.bigint();
    result = await eval(code);
    const endTimestamp = process.hrtime.bigint();
    executionTime = (endTimestamp - startTimestamp) / BigInt(1e6);
    if (typeof result !== "string") result = inspect(result, { depth: 0 });
  } catch (err) {
    error = err.stack || err.message;
  }

  const headerEmbed = {
    title: "Eval Command",
    footer: { text: `Execution time: ${executionTime || "N/A"} ms` },
    color: error ? Colors.Red : Colors.Blurple,
  };

  const codeEmbed = {
    title: "Code",
    description: codeBlock("js", code),
    color: Colors.Blurple,
  };

  const resultEmbed = {
    title: error ? "Error" : "Result",
    description: codeBlock("js", result || error),
    color: error ? Colors.Red : Colors.Green,
  };

  return interaction.editReply({
    embeds: [headerEmbed, codeEmbed, resultEmbed],
  });
}
