import Command from "../interfaces/Command";
import Bot from "./Bot";

class CommandListener {
  constructor(private commands: Command[]) {
    if (!Bot.client) return;
    Bot.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      this.commands.forEach((command) => {
        if (interaction.commandName === command.name) command.run(interaction);
      });
    });
  }
}

export default CommandListener;
