module.exports = (bot) => {
  const path = require("node:path");
  const express = require("express");
  const { botInviteLink, supportServerLink, websiteUrl } = require("../../config.json");

  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "./views/pages"));
  app.use(express.static(path.join(__dirname, "./public")));

  const data = {
    botName: bot.user.username,
    botAvatar: bot.user.displayAvatarURL(),
    usersCount: bot.users.cache.size,
    guildsCount: bot.guilds.cache.size,
    commandsCount: bot.commands.size,
    inviteLink: botInviteLink,
    discordLink: supportServerLink,
  };

  const meta = {
    home: {
      title: `${data.botName} - A Discord Music Bot`,
      description:
        "Enhance your Discord server's music experience with our versatile bot. Enjoy support for links from popular streaming platforms like YouTube, SoundCloud, Spotify, and Apple Music. Elevate your listening with innovative audio filters, including bass boost and nightcore effects. Explore a diverse range of commands for an elevated music experience.",
      url: `${websiteUrl}`,
    },
    commands: {
      title: `${data.botName} Bot - Extensive Command Set`,
      description:
        "Explore a comprehensive list of commands tailored to enhance your Discord server's music experience. From managing playback to accessing audio filters and retrieving track information, our bot offers a versatile range of functionalities. Whether you're adjusting volume, shuffling the queue, or seeking specific tracks, this bot provides the flexibility and control you need.",
      url: `${websiteUrl}/commands`,
    },
    invite: {
      title: `Invite ${data.botName} to Your Server`,
      description: `Bring ${data.botName}, a dynamic music bot, into your discord server to enhance your music experience. Enjoy seamless music playback, versatile commands, and innovative audio filters.`,
      url: `${websiteUrl}/invite`,
    },
    support: {
      title: `Join The Discord Support Server of ${data.botName}`,
      description:
        "Need help, have suggestions, or just want to hang out with fellow bot enthusiasts? Join our Discord support server for assistance, discussions, and a vibrant community experience.",
      url: `${websiteUrl}/support`,
    },
    terms: {
      title: `${data.botName} Bot - Terms of Service`,
      description:
        "Read our Terms of Service to understand the guidelines, rules, and conditions governing the use of this bot.",
      url: `${websiteUrl}/terms`,
    },
    privacy: {
      title: `${data.botName} Bot - Privacy Policy`,
      description: `Learn about how ${data.botName} Bot collects, uses, and protects your data with our Privacy Policy. We are committed to safeguarding your privacy and ensuring transparency in how we handle your information.`,
      url: `${websiteUrl}/privacy`,
    },
    404: {
      title: `${data.botName} - Page Not Found`,
      description: "The page you are looking for does not exist.",
      url: `${websiteUrl}/404`,
    },
  };

  app.get("/", (_req, res) => {
    res.render("home", { metadata: meta.home, data });
  });

  app.get("/commands", (_req, res) => {
    data.commands = bot.commands.filter((cmd) => cmd.category !== "dev");
    res.render("commands", { metadata: meta.commands, data });
  });

  app.get("/invite", (_req, res) => {
    res.render("invite", { metadata: meta.invite, data });
  });

  app.get("/support", (_req, res) => {
    res.render("support", { metadata: meta.support, data });
  });

  app.get("/terms", (_req, res) => {
    res.render("terms", { metadata: meta.terms, data });
  });

  app.get("/privacy", (_req, res) => {
    res.render("privacy", { metadata: meta.privacy, data });
  });

  app.get("/contact", (_req, res) => {
    res.redirect("https://github.com/lakhindarpal");
  });

  app.use((_req, res) => {
    res.status(404).render("404", { metadata: meta["404"], data });
  });

  // start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
};
