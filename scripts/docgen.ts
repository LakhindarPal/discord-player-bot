import { Glob } from "bun";
import type {
  APIApplicationCommandOption,
  APIApplicationCommandOptionChoice,
} from "discord.js";
import type { SlashCommand } from "../src/types/command";

interface ParsedOption {
  choices?: string[];
  description: string;
  max?: number;
  min?: number;
  name: string;
  required: boolean;
  type: string;
}

interface CommandDoc {
  category: string;
  cooldown?: number;
  description: string;
  devOnly: boolean;
  fullName: string;
  group?: string;
  name: string;
  options: ParsedOption[];
  parent?: string;
  queueOnly: boolean;
  sameVC: boolean;
  usage: string;
}

const optionTypeMap: Record<number, string> = {
  1: "Subcommand",
  2: "Subcommand Group",
  3: "String",
  4: "Integer",
  5: "Boolean",
  6: "User",
  7: "Channel",
  8: "Role",
  9: "Mentionable",
  10: "Number",
  11: "Attachment",
};

const categoryMetadata: Record<string, { description: string; title: string }> =
  {
    config: {
      description:
        "Server configuration, prefix management, and guild-specific settings.",
      title: "Configuration Commands",
    },
    dev: {
      description:
        "Internal debugging, maintenance, and administrative evaluation utilities.",
      title: "Developer Commands",
    },
    misc: {
      description:
        "General utility commands for bot information, server help, latency diagnostics, and uptime.",
      title: "General & Utility Commands",
    },
    music: {
      description:
        "Commands for controlling audio playback, managing queues, applying filters, and inspecting tracks.",
      title: "Music Commands",
    },
  };

function parseOptions(
  rawOptions?: APIApplicationCommandOption[],
): ParsedOption[] {
  if (!rawOptions || rawOptions.length === 0) return [];

  return rawOptions
    .filter((opt) => opt.type !== 1 && opt.type !== 2)
    .map((opt) => {
      const typeName = optionTypeMap[opt.type] ?? "Unknown";
      const choices =
        "choices" in opt && Array.isArray(opt.choices)
          ? (opt.choices as APIApplicationCommandOptionChoice[]).map(
              (c) => `\`${c.name}\``,
            )
          : undefined;

      const min =
        "min_value" in opt
          ? (opt.min_value as number)
          : "min_length" in opt
            ? (opt.min_length as number)
            : undefined;

      const max =
        "max_value" in opt
          ? (opt.max_value as number)
          : "max_length" in opt
            ? (opt.max_length as number)
            : undefined;

      return {
        choices,
        description: opt.description,
        max,
        min,
        name: opt.name,
        required: opt.required ?? false,
        type: typeName,
      };
    });
}

function buildUsage(fullName: string, options: ParsedOption[]): string {
  if (options.length === 0) return `\`${fullName}\``;
  const args = options
    .map((opt) => (opt.required ? `<${opt.name}>` : `[${opt.name}]`))
    .join(" ");
  return `\`${fullName} ${args}\``;
}

async function generateDocs() {
  const startTime = performance.now();
  const glob = new Glob("src/commands/**/*.ts");
  const commandDocs: CommandDoc[] = [];

  for await (const file of glob.scan(".")) {
    const mod = (await import(`../${file}`)) as SlashCommand;
    if (!mod.data) continue;

    const dataJson = mod.data.toJSON();
    const parent = mod.meta?.parent;
    const group = mod.meta?.group;
    const name = dataJson.name;

    const fullParts = [parent, group, name].filter(Boolean);
    const fullName = `/${fullParts.join(" ")}`;
    const options = parseOptions(dataJson.options);
    const usage = buildUsage(fullName, options);

    commandDocs.push({
      category: mod.meta?.category || "misc",
      cooldown: mod.meta?.cooldown,
      description: dataJson.description || "No description provided.",
      devOnly: Boolean(mod.meta?.devOnly),
      fullName,
      group,
      name,
      options,
      parent,
      queueOnly: Boolean(mod.meta?.queueOnly),
      sameVC: Boolean(mod.meta?.sameVC),
      usage,
    });
  }

  commandDocs.sort((a, b) => a.fullName.localeCompare(b.fullName));

  const categoryOrder = ["music", "misc", "config", "dev"];
  const grouped = new Map<string, CommandDoc[]>();

  for (const cat of categoryOrder) {
    grouped.set(cat, []);
  }

  for (const cmd of commandDocs) {
    const list = grouped.get(cmd.category) || [];
    list.push(cmd);
    grouped.set(cmd.category, list);
  }

  const lines: string[] = [];

  lines.push("# Commands Reference");
  lines.push("");
  lines.push(
    "A comprehensive, structured reference guide for all Deejay slash commands.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push("## Table of Contents");
  lines.push("");
  for (const cat of categoryOrder) {
    const cmds = grouped.get(cat) ?? [];
    if (cmds.length === 0) continue;
    const meta = categoryMetadata[cat];
    const title = meta?.title ?? `${cat.toUpperCase()} Commands`;
    const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    lines.push(`- [${title}](#${anchor}) (${cmds.length})`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const cat of categoryOrder) {
    const cmds = grouped.get(cat) ?? [];
    if (cmds.length === 0) continue;

    const meta = categoryMetadata[cat];
    const title = meta?.title ?? `${cat.toUpperCase()} Commands`;
    const description = meta?.description ?? "";

    lines.push(`## ${title}`);
    if (description) {
      lines.push("");
      lines.push(description);
    }
    lines.push("");

    lines.push("| Command | Usage | Description | Voice | Queue |");
    lines.push("| :--- | :--- | :--- | :---: | :---: |");

    for (const cmd of cmds) {
      const anchor = cmd.fullName
        .replace(/^\//, "")
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .toLowerCase();
      const voiceReq = cmd.sameVC ? "Yes" : "No";
      const queueReq = cmd.queueOnly ? "Yes" : "No";
      lines.push(
        `| [\`${cmd.fullName}\`](#${anchor}) | ${cmd.usage} | ${cmd.description} | ${voiceReq} | ${queueReq} |`,
      );
    }
    lines.push("");

    for (const cmd of cmds) {
      const anchor = cmd.fullName
        .replace(/^\//, "")
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .toLowerCase();

      lines.push(`### \`${cmd.fullName}\`<a id="${anchor}"></a>`);
      lines.push("");
      lines.push(`**Description**  \n${cmd.description}`);
      lines.push("");
      lines.push(`**Usage**  \n${cmd.usage}`);
      lines.push("");
      lines.push("**Specifications**");
      lines.push(`- **Category**: \`${cmd.category}\``);
      lines.push(
        `- **Voice Channel**: ${cmd.sameVC ? "Required" : "Not Required"}`,
      );
      lines.push(
        `- **Active Queue**: ${cmd.queueOnly ? "Required" : "Not Required"}`,
      );
      lines.push(`- **Developer Only**: ${cmd.devOnly ? "Yes" : "No"}`);
      if (cmd.cooldown) {
        lines.push(`- **Cooldown**: ${cmd.cooldown} seconds`);
      }

      if (cmd.options.length > 0) {
        lines.push("");
        lines.push("**Arguments**");
        lines.push("");
        lines.push(
          "| Argument | Type | Required | Description | Choices / Constraints |",
        );
        lines.push("| :--- | :---: | :---: | :--- | :--- |");

        for (const opt of cmd.options) {
          const reqStr = opt.required ? "**Yes**" : "No";
          let extra = "—";

          if (opt.choices && opt.choices.length > 0) {
            extra = opt.choices.join(", ");
          } else if (opt.min !== undefined || opt.max !== undefined) {
            const constraints: string[] = [];
            if (opt.min !== undefined) constraints.push(`Min: ${opt.min}`);
            if (opt.max !== undefined) constraints.push(`Max: ${opt.max}`);
            extra = constraints.join(", ");
          }

          lines.push(
            `| \`${opt.name}\` | \`${opt.type}\` | ${reqStr} | ${opt.description} | ${extra} |`,
          );
        }
      }

      lines.push("");
      lines.push("[Back to top](#table-of-contents)");
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }

  const outputPath = process.argv[2] || "COMMANDS.md";
  await Bun.write(outputPath, lines.join("\n"));

  const duration = (performance.now() - startTime).toFixed(1);
  console.log(
    `Successfully generated documentation for ${commandDocs.length} commands at ${outputPath} in ${duration}ms`,
  );
}

generateDocs().catch((err) => {
  console.error("Error generating command documentation:", err);
  process.exit(1);
});
