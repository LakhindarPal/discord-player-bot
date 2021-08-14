const catDetails = require("../../data/categoryDetails.json");
const categories = require("../../data/categories.json");
const config = require("../../../config.json");

module.exports = {
  name: "help",
  description: "Shows the commands menu",
  category: "utility",
  subCommands: ["<command>**\nShows detailed info about that command"],
  options: [{
    name: "command",
    type: "STRING",
    description: "The command you’r looking for",
    required: false
  }],
  execute(bot, interaction) {
    const arg = interaction.options.getString("command", false);

    if (arg) {
      const cmd = bot.commands.get(arg);
      if (!cmd)
        return bot.say.warnMessage(interaction, `No command was found named \`${arg}\`.`);

      const cmdUsage = cmd.usage ? `\/${cmd.name} ${cmd.usage}` : `\/${cmd.name}`;

      const embed = bot.say.rootEmbed(interaction)
        .setAuthor(`${cmd.category} command: ${cmd.name}`, bot.user.displayAvatarURL())
        .addField(`${cmdUsage}`, `${cmd.description ?? "Not specified"}`)
        .setFooter("[] : optional • <> : required • | : or");

      let subcmd = cmd.subCommands;
      if (subcmd && subcmd.length >= 1) {
        for (let s = 0; s < subcmd.length; s++) {
          embed.addField("** **", `**\/${cmd.name} ${subcmd[s]}`);
        }
      }

      return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    const botCmds = bot.commands.map((cmd) => {
      return { name: cmd.name, category: cmd.category };
    });

    const commands = [...botCmds];

    const cates = [];
    for (let i = 0; i < categories.length; i++) {
      const category = commands
        .filter(({ category }) => category === categories[i])
        .map(({ name }) => name);
      cates.push(category);
    }

    const embed = bot.say.rootEmbed(interaction);
    for (let j = 0; j < cates.length; j++) {
      const name = catDetails[categories[j]];
      if (categories[j] === "botowner" && !config.owners.includes(interaction?.user.id)) continue;
      embed.addField(`${name}`, `\`\`\`${cates[j].join(", ")}\`\`\``);
    }

    embed
      .addField("** **", `[Support](${config.supportServer}) |  [Invite](${config.inviteLink})`)
      .setFooter(`Type '\/help <command>' for more details on a command`)
      .setAuthor("Help Commands", bot.user.displayAvatarURL());

    return interaction.reply({ ephemeral: true, embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};
