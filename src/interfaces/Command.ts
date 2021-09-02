import { CommandInteraction } from "discord.js";

export default interface Command {
  name: string;
  description: string;
  run: (interaction: CommandInteraction) => void;
}
