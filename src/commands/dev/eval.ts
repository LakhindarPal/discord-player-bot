import { inspect } from "node:util";
import {
  type ChatInputCommandInteraction,
  Colors,
  codeBlock,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import replies from "#modules/replies";
import type { CommandMeta } from "#types/command";

export const data = new SlashCommandBuilder()
  .setName("eval")
  .setDescription("Execute a JavaScript expression")
  .addStringOption((option) =>
    option
      .setName("code")
      .setDescription("The piece of JavaScript code.")
      .setRequired(true),
  );

export const meta: CommandMeta = {
  category: "dev",
  devOnly: true,
};

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

  const code = interaction.options.getString("code", true);

  // Security check to prevent execution of potentially harmful code
  const classified = ["env", "token", "config", "secret", "process"];
  if (classified.some((item) => code.toLowerCase().includes(item))) {
    return interaction.editReply(
      replies.error(
        "Execution blocked: expression may contain sensitive data.",
        false,
      ),
    );
  }

  // biome-ignore lint/correctness/noUnusedVariables: client is in scope for eval
  const client = interaction.client;

  let result: string | undefined;
  let error: string | undefined;
  let executionTime: bigint | undefined;

  try {
    const startTimestamp = process.hrtime.bigint();
    // biome-ignore lint/security/noGlobalEval: developer evaluation command
    const evalResult = await eval(code);
    const endTimestamp = process.hrtime.bigint();
    executionTime = (endTimestamp - startTimestamp) / BigInt(1e6);
    result =
      typeof evalResult === "string"
        ? evalResult
        : inspect(evalResult, { depth: 0 });
  } catch (e: unknown) {
    error = e instanceof Error ? e.stack || e.message : String(e);
  }

  const headerEmbed = new EmbedBuilder()
    .setColor(error ? Colors.Red : Colors.Blurple)
    .setFooter({ text: `Execution time: ${executionTime ?? "N/A"} ms` })
    .setTitle("Eval Command");

  const codeEmbed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setDescription(codeBlock("js", code))
    .setTitle("Code");

  const resultEmbed = new EmbedBuilder()
    .setColor(error ? Colors.Red : Colors.Green)
    .setDescription(codeBlock("js", result || error || "No output"))
    .setTitle(error ? "Error" : "Result");

  return interaction.editReply({
    embeds: [headerEmbed, codeEmbed, resultEmbed],
  });
}
