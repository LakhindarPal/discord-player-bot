# Discord Player Bot

It is a Discord music bot built using [discord-player](https://npm.im/discord-player) & [discord.js](https://npm.im/discord.js) library.

![Discord.js Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/discord-player-bot/discord.js)
![Discord Player Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/discord-player-bot/discord-player)

![License](https://img.shields.io/github/license/LakhindarPal/discord-player-bot)
![Contributors](https://img.shields.io/github/contributors/lakhindarpal/discord-player-bot)
![Stars](https://img.shields.io/github/stars/LakhindarPal/discord-player-bot)

[![Support](https://img.shields.io/badge/Discord-Support-blue)](https://discord.gg/8yaJBZBQTA)

## Table of Contents

- [Features](#features)
- [Disclaimer (Terms of Use)](#disclaimer-terms-of-use)
- [Disclaimer (if self-hosted)](#disclaimer-if-self-hosted)
- [Installation](#installation)
  - [Before you start](#before-you-start)
  - [Config](#config)
  - [Local Installation](#local-installation)
  - [Docker Installation](#docker-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Feedback](#feedback)
- [Star History](#star-history)
- [Supporters](#supporters)

## Features

- **Beginner-Friendly**: Designed with simplicity in mind, making it easy for users of all skill levels to understand and use.
- **Quick Setup**: Get the bot up and running swiftly with straightforward installation instructions and minimal configuration requirements.
- **Versatile Commands**: A comprehensive range of commands to cater to various music playback needs, ensuring an enjoyable listening experience for all users.
- **Audio Filters**: Access to 25 different ffmpeg audio filters, allowing users to customize their listening experience to their preferences.
- **Multi-Guild Support**: Effortlessly manage the bot across multiple Discord guilds, providing flexibility for diverse communities.
- **Platform Integration**: Supports various platform links, enabling users to play music from a wide range of sources, including YouTube, Spotify, SoundCloud, Apple Music, Reverbnation, Deezer, Tidal, and more.
- **Slash Commands**: Take advantage of slash commands for seamless interaction with the bot, enhancing user experience and accessibility.

## Disclaimer (Terms of Use)

This project is intended for educational and entertainment purposes only. It is not designed to encourage or facilitate any form of unfair usage. If you represent a supported streaming platform and have concerns about the bot's functionality, please reach out to us via GitHub Discussions or our support channels for a constructive dialogue.

## Disclaimer (if self-hosted)

- **Prohibited Use**: Uploading this bot to any bot listing service such as Discord Bot List or top.gg is strictly prohibited.
- **Community Hosting Only**: You are authorized to host this bot exclusively for your community's use.
- **Security Responsibility**: Hosting the bot on public platforms like Glitch.com or repl.it poses a risk of bot token exposure. In the event of such an incident, you are solely responsible for any consequences.

We appreciate your cooperation and understanding in adhering to these guidelines.

## Installation

### Before You Start

Before diving into the setup process, ensure you have the following prerequisites:

- **Discord Token** A Discord application with a bot token. You can create one by following the [Discord Developer Portal](https://discord.com/developers/applications) guide.

- **Node.js**: Version 20 or higher is required. If you haven't already installed Node.js, you can download it from the [official website](https://nodejs.org/en/download/).
- **NPM**: A package manager is required. NPM comes bundled with Node.js, so no separate installation is required.
- **FFmpeg or Avconv**: Ensure you have FFmpeg or Avconv installed for media transcoding. You can download (recommended) FFmpeg from the [official website](https://ffmpeg.org/download.html) or install it via npm `npm i ffmpeg-static`.

### Config

To configure the Discord Player Bot, you'll need to set up environment variables in a `.env` file. Here's how to do it:

1. **Create `.env` File**: In the root directory of the cloned repository, create a new file named `.env`.

2. **Use `.env.sample` as Template**: Open the `.env.sample` file provided in the repository. This file contains a template with placeholders for environment variables.

3. **Fill in Environment Variables**: Replace the placeholder values in the `.env.sample` file with your actual values. Refer to the comments in the file for guidance on each variable.

4. **Save as `.env`**: After filling in the environment variables, save the file as `.env` in the same directory. This file will be used by the bot to load configuration during runtime.

5. **Review Configuration**: Double-check the configuration in the `.env` file to ensure that all necessary variables are properly set.

By following these steps and customizing the `.env` file with your specific configuration, you can effectively set up the Discord Player Bot according to your requirements.

### Local Installation

1. **Fill the `.env` File**: Ensure that you have filled out the necessary environment variables in the `.env` file as described above.

2. **Install Dependencies**: Install the required dependencies by running the following command in the project directory:

   ```bash
   npm install
   ```

3. **Register Slash Commands**: If you are using this bot for the first time or have added new commands, you need to register the slash commands with Discord. Run the following command:

   ```bash
   npm run register
   ```

   This will register all the slash commands defined in your project with Discord. You should see a message indicating the number of commands registered.

4. **Run the Bot**: Start the bot by running:

   ```bash
   npm start
   ```

   This will launch the bot, and it will connect to Discord using the provided token.

### Docker Installation

If you prefer to use Docker for deploying the Discord Player Bot, follow these steps:

1. **Fill the `.env` File**: Ensure that you have filled out the necessary environment variables in the `.env` file as described above.

2. **Build Docker Image**: Run the following command to build the Docker image:

   ```bash
   docker build -t discord-player-bot .
   ```

This command will use the Dockerfile provided in the repository to build the Docker image.

3. **Run Docker Container**: Once the Docker image is built successfully, you can run the Docker container using the following command:

   ```bash
   docker run --env-file .env discord-player-bot
   ```

4. **Enjoy Dockerized Discord Player Bot**: Your Discord Player Bot should now be running in a Docker container, ready to provide music playback functionality in your Discord server.

By following these steps, you can deploy the Discord Player Bot using Docker, providing a convenient and isolated environment for running the bot.

## Usage

Once the bot is running and added to your Discord server, you can use the features it provides.
For detailed command usage and examples, please refer to the [Commands](./COMMANDS.md) documentation.

## Contributing

1. [Fork the repo](https://github.com/LakhindarPal/discord-player-bot/fork)
2. Install the dependencies (`npm install`)
3. Create the feature branch (`git checkout -b my-cool-feature`)
4. Commit your changes (`git commit -m "Added a cool new feature!"`)
5. Push to your branch (`git push origin my-cool-feature`)
6. [Open a pull request](https://github.com/LakhindarPal/discord-player-bot/pulls)

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## Support

If you need further help with this project, to get support faster you can join the Discord server by just clicking [here](https://discord.gg/8yaJBZBQTA).

## Feedback

We value your feedback! If you have any suggestions, feature requests, or bug reports, please open an issue or reach out to us on Discord.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lakhindarpal/discord-player-bot&type=Date)](https://star-history.com/#lakhindarpal/discord-player-bot&Date)

## Supporters

[![Stargazers repo roster](https://reporoster.com/stars/lakhindarpal/discord-player-bot)](https://github.com/lakhindarpal/discord-player-bot/stargazers)
[![Forkers repo roster](https://reporoster.com/forks/lakhindarpal/discord-player-bot)](https://github.com/lakhindarpal/discord-player-bot/network/members)

---

![Animated footer gif](http://randojs.com/images/barsSmallTransparentBackground.gif)
[![Back to top](http://randojs.com/images/backToTopButtonTransparentBackground.png)](#discord-player-bot)

---
