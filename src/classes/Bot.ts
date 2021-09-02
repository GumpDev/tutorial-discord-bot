import { Client, Intents } from "discord.js";

const intents = [Intents.FLAGS.GUILDS];

class Bot {
  public static client: Client;
  constructor(private token: string) {
    Bot.client = new Client({ intents });
    Bot.client.on("ready", () => {
      if (Bot.client.user)
        console.log(`O bot está funcionando como ${Bot.client.user.tag}!`);
    });
  }
  start() {
    Bot.client.login(this.token);
  }
}

export default Bot;
