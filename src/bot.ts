import Bot from "./classes/Bot";
import { config } from "dotenv";
import Rest from "./classes/Rest";
import Commands from "./commands";
import CommandListener from "./classes/CommandListener";

config();

const init = () => {
  if (!process.env.TOKEN) {
    console.error("O Token não foi encontrado!");
    return;
  }
  // if (!process.env.CLIENT_ID) {
  //   console.error("O ClientId não foi encontrado!");
  //   return;
  // }

  // const rest = new Rest(process.env.TOKEN, process.env.CLIENT_ID);
  // rest.registerCommands(Commands);
  // rest.start();
  const bot = new Bot(process.env.TOKEN);
  // const commands = new CommandListener(Commands);
  bot.start();
};
init();
