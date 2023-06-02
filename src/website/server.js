module.exports = (bot) => {
  const path = require("node:path");
  const express = require("express");
  const { botInviteLink, supportServerLink } = require("../../config.json");

  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "./views/pages"));
  app.use(express.static(path.join(__dirname, "./public")));

  const data = {
    botname: bot.user.username,
    avatar: bot.user.displayAvatarURL(),
    users: bot.users.cache.size,
    guilds: bot.guilds.cache.size,
    commands: bot.commands.size,
  };

  app.get("/", (_req, res) => {
    const features = require("./public/assets/features");
    res.render("home", { title: `${data.botname} - A discord music bot`, data, features });
  });

  app.get("/commands", (_req, res) => {
    const commands = bot.commands;
    const categories = ["Music", "Misc", "Dev"];
    res.render("commands", {
      title: `${data.botname} Bot Commands - A detailed documentation`,
      data,
      commands,
      categories,
    });
  });

  app.get("/invite", (_req, res) => {
    res.redirect(botInviteLink);
  });

  app.get("/support", (_req, res) => {
    res.redirect(supportServerLink);
  });

  app.get("/contact", (_req, res) => {
    res.redirect("https://github.com/l0ser8228");
  });

  app.use((_req, res) => {
    res.status(404).render("404", { title: `${data.botname} - Time machine broke`, data });
  });

  // start the server
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
