import fs from "fs";
import { Collection } from "discord.js";
import { loadCommands } from "../src//handlers/command.js";
import { titleCase } from "../src/modules/utils.js";

const OPTION_TYPE_MAP = {
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

const formatOptions = (options) => {
  if (!options || options.length === 0) return "";

  let optionsTable = `| Name | Description | Required | Type | Choices |\n`;
  optionsTable += `|------|-------------|----------|------|---------|\n`;

  options.forEach((option) => {
    const choices = option.choices
      ? option.choices.map((choice) => choice.name).join(", ")
      : "";
    optionsTable += `| ${option.name} | ${option.description} | ${option.required ?? false} | ${OPTION_TYPE_MAP[option.type]} | ${choices} |\n`;

    if (option.options) {
      optionsTable += formatOptions(option.options);
    }
  });

  return optionsTable;
};

const formatCommand = (command) => {
  const { data } = command;
  const hasSubcommand = data.options?.[0]?.type === 1;
  let commandStr = hasSubcommand
    ? ""
    : `### \`/${data.name}\`\n${data.description}\n`;

  if (data.options) {
    if (hasSubcommand) {
      data.options.forEach((subcommand) => {
        commandStr += `### \`/${data.name} ${subcommand.name}\`\n${subcommand.description}\n`;
        commandStr += formatOptions(subcommand.options);
        commandStr += "\n---\n";
      });
    } else {
      commandStr += formatOptions(data.options);
    }
  }

  if (!hasSubcommand) commandStr += "\n---\n";

  return commandStr;
};

const generateContent = (commands) => {
  const categories = new Map();

  commands.forEach((command) => {
    const { category } = command.data;
    const categoryName = titleCase(category);
    const categoryCommands = categories.get(categoryName) || [];
    categoryCommands.push(command);
    categories.set(categoryName, categoryCommands);
  });

  let markdown = "# Slash Commands List\n\n";
  for (const [category, categoryCommands] of categories) {
    markdown += `## ${category} Commands\n\n`;
    categoryCommands.forEach((command) => {
      markdown += formatCommand(command);
    });
  }

  return markdown;
};

async function generateMarkdown() {
  try {
    const fakeClient = { commands: new Collection() };
    await loadCommands(fakeClient);

    const content = generateContent(fakeClient.commands);

    fs.writeFileSync("docs/COMMANDS.md", content);
    console.log("COMMANDS.md has been generated.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

generateMarkdown();
