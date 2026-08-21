# Discord Player Bot

A Discord music bot built using [discord-player](https://npm.im/discord-player) and [discord.js](https://npm.im/discord.js) on the [Bun](https://bun.sh) runtime.

![Discord.js Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/discord-player-bot/discord.js)
![Discord Player Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/discord-player-bot/discord-player)
![Project Version](https://img.shields.io/github/package-json/v/LakhindarPal/discord-player-bot)
![License](https://img.shields.io/github/license/LakhindarPal/discord-player-bot?link=LICENSE)
![Contributors](https://img.shields.io/github/contributors/lakhindarpal/discord-player-bot?logo=github&link=https%3A%2F%2Fgithub.com%2FLakhindarPal%2Fdiscord-player-bot%2Fgraphs%2Fcontributors)
![Stars](https://img.shields.io/github/stars/LakhindarPal/discord-player-bot?link=https%3A%2F%2Fgithub.com%2FLakhindarPal%2Fdiscord-player-bot%2Fstargazers)
![Forks](https://img.shields.io/github/forks/LakhindarPal/discord-player-bot?link=https%3A%2F%2Fgithub.com%2FLakhindarPal%2Fdiscord-player-bot%2Fforks)
![Docker Pulls](https://img.shields.io/docker/pulls/lakhindarpal/discord-player-bot?logo=docker&label=Pulls&link=https%3A%2F%2Fhub.docker.com%2Fr%2Flakhindarpal%2Fdiscord-player-bot)
[![Support](https://img.shields.io/badge/Support-Discord-blue?style=for-the-badge&logo=discord)](https://discord.gg/8yaJBZBQTA)

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Local Installation](#local-installation)
  - [Docker Installation](#docker-installation)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Help and Support](#help-and-support)
- [Feedback](#feedback)

## Features

- **Blazing Fast**: Powered by the high-performance Bun runtime.
- **Multiple Audio Sources**: Stream music from Spotify, SoundCloud, Apple Music, and more.
- **Audio Filters**: Customize sound with 25 FFmpeg filters.
- **Interactive UI**: Real-time player message controls, dynamic song select dropdowns, and interactive pagination.
- **Strictly Typed**: Built with modern TypeScript, Discord.js v14, and Discord-Player v7.
- **Extensive Command Suite**: 40+ slash commands for queue control, history tracking, sorting, and playback management.
- **Multi-Guild Support**: Concurrent playback across multiple Discord voice channels.

## Commands

A complete, auto-generated list of all slash commands, descriptions, arguments, and constraints is available in the commands reference:

- [View Commands Reference](COMMANDS.md)

## Installation

### Prerequisites

Ensure you have the following installed before setting up the bot:

- **Discord Bot Token**: Create an application in the [Discord Developer Portal](https://discord.com/developers/applications) and obtain a bot token with Voice and Application Command permissions.
- **Bun**: Version 1.2 or higher. Install from [bun.sh](https://bun.sh).
- **FFmpeg**: Required for media transcoding. Install via your system package manager (`sudo apt install ffmpeg`, `apk add ffmpeg`, `brew install ffmpeg`, or download from [ffmpeg.org](https://ffmpeg.org/download.html)).

### Configuration

Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Configure the following environment variables:

| Variable            | Description                                                                 |
| :------------------ | :-------------------------------------------------------------------------- |
| `DISCORD_BOT_TOKEN` | Discord bot authentication token.                                           |
| `BOT_CLIENT_ID`     | Application Client ID used for registering slash commands.                  |
| `DEV_GUILD_ID`      | Server ID for instant developer command registration.                       |
| `DEV_USER_IDS`      | Comma-separated list of Discord user IDs authorized for developer commands. |
| `HELP_SERVER_LINK`  | Discord invite link to your support server.                                 |
| `NODE_ENV`          | Environment mode (`development` or `production`).                           |

### Local Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/LakhindarPal/discord-player-bot.git
   cd discord-player-bot
   ```

2. **Install Dependencies**:

   ```bash
   bun install
   ```

3. **Configure Environment**:
   Ensure `.env` is populated with your bot credentials.

4. **Register Slash Commands**:

   ```bash
   bun run register
   ```

5. **Start the Bot**:

   ```bash
   bun run start
   ```

   For development mode with hot-reloading:

   ```bash
   bun run dev
   ```

### Docker Installation

1. **Configure Environment**:
   Ensure your `.env` file is properly configured.

2. **Pull Docker Image**:

   ```bash
   docker pull lakhindarpal/discord-player-bot:latest
   ```

3. **Run Docker Container**:

   ```bash
   docker run -d --name discord-player-bot --env-file .env lakhindarpal/discord-player-bot:latest
   ```

4. **Register Slash Commands inside Container**:
   ```bash
   docker exec -it discord-player-bot bun run register
   ```

## Contributing

Contributions are always welcome. Follow these steps to contribute:

1. [Fork the repository](https://github.com/LakhindarPal/discord-player-bot/fork).
2. Install the dependencies (`bun install`).
3. Create a feature branch (`git checkout -b feature/my-cool-feature`).
4. Commit your changes (`git commit -m "Add cool new feature"`).
5. Push to your branch (`git push origin feature/my-cool-feature`).
6. [Open a Pull Request](https://github.com/LakhindarPal/discord-player-bot/pulls).

## Disclaimer

This project is not affiliated with Discord or any streaming platforms. It is intended for educational and entertainment purposes only. It is not designed to encourage or facilitate any form of unfair usage. It merely provides users with tools and it is entirely up to the user to use this project in the way they see fit. The author of this project (LakhindarPal) is not responsible for any misuse. If you represent a supported streaming platform and have concerns, please reach out via GitHub Discussions or the Discord support server.

## License

This project is licensed under the terms of the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Help and Support

If you need help or have questions regarding this bot, join our Discord support server:

- [Join Support Server](https://discord.gg/8yaJBZBQTA)

## Feedback

We value your feedback. If you have any suggestions, feature requests, or bug reports, please open an issue on GitHub or reach out on Discord.
