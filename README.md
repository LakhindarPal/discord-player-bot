# Discord Player Bot

It is a Discord music bot built on top of **[discord-player](https://npm.im/discord-player)** & **[discord.js](https://npm.im/discord.js)** library.

![license](https://img.shields.io/github/license/lakhindarpal/discord-player-bot?color=gr)
![contr](https://img.shields.io/github/contributors/lakhindarpal/discord-player-bot)
[![stars](https://img.shields.io/github/stars/lakhindarpal/discord-player-bot?color=gr)](https://github.com/lakhindarpal/discord-player-bot)
[![Support](https://img.shields.io/badge/Support-Server-blue)](https://discord.gg/8yaJBZBQTA)

# Features

- Beginner friendly, easy to understand
- Quick and easy to set up
- Wide range of commands
- 25 ffmpeg audio filters
- Multiple guild support
- Varius platforms links support
- Slash commands available
- and many more.

# Disclaimer ( Terms of Use)

It's just a fun project. It's not made to promote any unfair usage. If you're a representative of the supported streaming platform and have any issues, please open an issue for discussion.

# Disclaimer (if self-hosted)

- You are not allowed to upload this bot to any bot listing service such as discordbotlist or top.gg.
- You are only allowed to host this bot for your community.
- If you host your bot in public services such as Glitch.com or repl.it, there is a risk of bot token leaking. If that happens with your bot, you and only you are responsible.

# Installation

## Before you start

To use the project correctly you will need some tools.

### Node JS

You need Node JS 16.9 or higher version for environment.
Check out the [official site](https://nodejs.org/en) for help with that.
**[Download Node JS](https://nodejs.org/en/download)**

### NPM

You need NPM 7 or higher version to install packages. Luckily NPM comes prebundled with Node JS.
Check out the [official site](https://www.npmjs.com/) for any troubleshooting.

### FFmpeg or Avconv

FFmpeg or Avconv is required for media transcoding. You can get it from [https://ffmpeg.org](https://www.ffmpeg.org/download.html) or by installing it from npm (ffmpeg-static or other binaries are not recommended):

```bash
$ npm i ffmpeg-static
# or
$ npm i @ffmpeg-installer/ffmpeg
# or
$ npm i @node-ffmpeg/node-ffmpeg-installer
# or
$ npm i ffmpeg-binaries
```

> Use `FFMPEG_PATH` environment variable to load ffmpeg from custom path.

# Setup

Before start make sure you've done the above process.

## Clone the repository

```bash
git clone lakhindarpal/discord-player-bot
```

## Configuration

Open the configuration file located in the root directory. Rename it from `config.json.example` to `config.json`.
And fill every details correctly.

```json
{
  "botDevIds": [],
  "botInviteLink": "",
  "devGuildId": "",
  "logChannelId": "",
  "supportServerLink": ""
}
```

### Here's what it mean

- `botinviteLink`, the invite link that will be used to invite the bot to server.
- `supportServerLink`, the discord support server link.
- `botDevIds`, an array of bot developers user id. Only this users can use devOnly commands (i,e eval command).
- `devGuildId`, the guild id, in which you want to register dev only commands.
- `logChannelId`, a discord text channel id, if you want to log error in discord. Else errors will be logged in console.

### Environment variable (very important)

- For security reason the token is not saved in config file. Add `DISCORD_BOT_TOKEN` in your environment variable. The token of the bot can be obtained from the [Discord Developers](https://discordapp.com/developers/applications) section.

## Install dependencies

Install all the packages using npm

```bash
$ npm install
```

## Start

Start the bot using node

```bash
$ node src/index.js
```

# Docker installation

If you prefer docker instead, you can do the following.

1. Fill the `config.json` file
2. Run `npm run build`
3. Enjoy dockerized discord-player-bot

## Support Deejay

### All stars/forks are appreciated! ⚡

**Feel free to open a pull request with a new feature.**

Made with ❤️ and JavaScript!

## License

[Apache © LakhindarPal](./LICENSE)

# Support Server

If you need further help with this project, to get support faster you can join the discord server by just clicking [here](https://discord.gg/8yaJBZBQTA).

[![banner](https://invite.caspertheghost.me?inviteCode=8yaJBZBQTA)](https://discord.gg/8yaJBZBQTA)

#### Pre-qualities

- Basic understanding of nodejs, discordjs.

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lakhindarpal/discord-player-bot)](https://star-history.com/#lakhindarpal/discord-player-bot)

## Supporters

[![Stargazers repo roster](https://reporoster.com/stars/lakhindarpal/discord-player-bot)](https://github.com/lakhindarpal/discord-player-bot/stargazers)
[![Forkers repo roster](https://reporoster.com/forks/lakhindarpal/discord-player-bot)](https://github.com/lakhindarpal/discord-player-bot/network/members)

<p align="center"><a href="https://github.com/lakhindarpal/discord-player-bot"><img src="http://randojs.com/images/barsSmallTransparentBackground.gif" alt="Animated footer bars" width="100%"/></a></p>
<br/>
<p align="center"><a href="https://github.com/lakhindarpal/discord-player-bot#"><img src="http://randojs.com/images/backToTopButtonTransparentBackground.png" alt="Back to top" height="29"/></a></p>
