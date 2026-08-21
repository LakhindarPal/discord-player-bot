declare global {
  namespace NodeJS {
    interface Process {
      on(event: string, listener: (...args: any[]) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      off(event: string, listener: (...args: any[]) => void): this;
    }

    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string;
      DEV_USER_IDS: string;
      BOT_CLIENT_ID: string;
      DEV_GUILD_ID: string;
      HELP_SERVER_LINK: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
