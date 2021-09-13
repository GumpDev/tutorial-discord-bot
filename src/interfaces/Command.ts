import { CommandInteraction } from "discord.js";

export interface Option {
  name: string;
  description: string;
  type: OptionType;
  required?: boolean;
  choices?: {
    name: string;
    value: string;
  }[];
}

export enum OptionType {
  Boolean,
  Channel,
  Integer,
  Mention,
  Role,
  String,
  User,
}

export default interface Command {
  name: string;
  description: string;
  options?: Option[];
  run: (interaction: CommandInteraction) => void;
}
