# discord-player-bot

![license](https://img.shields.io/github/license/l0ser8228/discord-player-bot?color=gr)
![contr](https://img.shields.io/github/contributors/l0ser8228/discord-player-bot)
[![stars](https://img.shields.io/github/stars/l0ser8228/discord-player-bot?color=gr)](https://github.com/l0ser8228/discord-player-bot)
[![invite](https://img.shields.io/badge/Invite-DeejayBot-blue)](https://discord.ly/deejay)
[![Support](https://img.shields.io/badge/Support-Server-blue)](https://discord.gg/8yaJBZBQTA)

Discord music bot built using discord.js v14 & discord-player v6.3.0. Slash Commands only bot

[![banner](https://invidget.switchblade.xyz/8yaJBZBQTA)](https://discord.gg/8yaJBZBQTA)

If you need help with this project, to get support faster you can join the help server by just clicking [here](https://discord.gg/8yaJBZBQTA).

**_`If you don't have any development knowledge, I can't help you.`_**

### Configuration

Open the configuration file located in the root directory `config.json`.

```json
{
  "botDevIds": [""],
  "botInviteLink": "",
  "devGuildId": "",
  "logChannelId": "",
  "supportServerLink": ""
}
```

Basic configuration

- `botinviteLink`, the invite link that will be used to invite the bot
- `supportServerLink`, the discord support server link
- `botDevIds`, an array of bot developer ids, i,e. `"owners": ["123456789012"]`
- `devGuildId`, the guild id, in which you want to register dev only commands
- `logChannelId`, a discord text channel id, if you want to log error in discord. Else errors will be logged in console.

- Add `DISCORD_BOT_TOKEN` in your environment variable. The token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section

### 📑 Installation

To use the project correctly you will need some tools.

[NPM](https://www.npmjs.org) (>= v7) to install packages

[Node JS](https://nodejs.org/en/) (>= v16.9) for environment

[FFMPEG](https://ffmpeg.org) for media transcoding

**step**

1. `npm install`
2. `node src/index.js`

### Docker installation

1. Fill the `config.json` file
2. Run `npm run build`
3. Enjoy dockerized discord-player-bot

### Disclaimer (if self-hosted)

You are not allowed to upload this bot to any service such as discordbotlist or top.gg.
You are also not allowed to use this project for any comercial purposes or to make money.
You are only allowed to host this bot for your community.

## Support Deejay

### All stars/forks are appreciated! ⚡

**Feel free to open a pull request with a new feature.**

Made with ❤️ and JavaScript!

## License

[Apache © L0SER](./LICENSE)

## Hosting Problems

> I would not recommend self-hosting the bot on repl.it, Glitch and other public services. If you host your bot in public Glitch.com or repl.it projects, you take a risk, the risk is that in public projects ANYONE can steal your bot TOKEN and hack it, people that steal bot tokens will use your bot to DM advertise users, to raid servers, to scam people with fake things, and to impersonate the bot owner.

> If that happens with your bot, YOU have the fault for hosting it on a public project.
> For those things i recommend hosts like Danbot or other private hosts (except FalixNodes, they sell user data), repl.it and glitch.com projects are easy to steal, anyone can get your token and/or other confidential information.

- Text by [@Tegnio](https://github.com/tegnio)
