import fs from "fs";
import { Collection } from "discord.js";
import { loadCommands } from "../handlers/command.js";

const optionTypeMap = {
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

const titleCase = (str) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatOptions = (options) => {
  if (!options || options.length === 0) return "";

  let optionsTable = `| Name | Description | Required | Type | Choices |\n`;
  optionsTable += `|------|-------------|----------|------|---------|\n`;

  options.forEach((option) => {
    const choices = option.choices
      ? option.choices.map((choice) => `${choice.name}`).join(", ")
      : "";
    optionsTable += `| ${option.name} | ${option.description || ""} | ${option.required || false} | ${optionTypeMap[option.type] || option.type} | ${choices} |\n`;

    if (option.options) {
      optionsTable += formatOptions(option.options);
    }
  });

  return optionsTable;
};

const formatCommand = (command) => {
  const hasSubCommand = command.data.options?.[0]?.type === 1;
  let commandStr = hasSubCommand
    ? ""
    : `## /${command.data.name}\n${command.data.description}\n`;

  if (command.data.options) {
    if (hasSubCommand) {
      command.data.options.forEach((subCommand) => {
        commandStr += `## /${command.data.name} ${subCommand.name}\n${subCommand.description}\n`;
        commandStr += formatOptions(subCommand.options);
      });
    } else {
      commandStr += formatOptions(command.data.options);
    }
  }

  return commandStr;
};

const generateMarkdown = (commands) => {
  let markdown = "# Slash Commands List\n\n";
  const categories = {};

  commands.forEach((command) => {
    const category = `${titleCase(command.data.category)} Commands`;
    categories[category] = categories[category] || [];
    categories[category].push(command);
  });

  for (const category in categories) {
    markdown += `## ${category}\n\n`;
    categories[category].forEach((command) => {
      markdown += formatCommand(command);
    });
  }

  return markdown;
};

(async function main() {
  const fakeClient = { commands: new Collection() };
  await loadCommands(fakeClient);
  const markdown = generateMarkdown(fakeClient.commands);
  fs.writeFileSync("COMMANDS.md", markdown);
  console.log("COMMANDS.md has been generated.");
})();
