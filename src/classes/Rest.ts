import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommandOptionBase } from "@discordjs/builders/dist/interactions/slashCommands/mixins/CommandOptionBase";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import Command, { Option, OptionType } from "../interfaces/Command";

class Rest {
  private rest: REST;
  private commands: Command[] = [];
  constructor(private token: string, private clientId: string) {
    this.rest = new REST({ version: "9" }).setToken(this.token);
  }
  registerCommands(commands: Command[]) {
    this.commands = commands;
  }
  start() {
    (async () => {
      try {
        console.log("Recarregando os comandos de barra da aplicação...");
        await this.rest.put(Routes.applicationCommands(this.clientId), {
          body: this.commands.map((command) => {
            const data = new SlashCommandBuilder()
              .setName(command.name.toLowerCase())
              .setDescription(command.description);
            const dataWithOptions = this.addFields(data, command.options);
            return dataWithOptions.toJSON();
          }),
        });
        console.log(
          "Os comandos de barra da aplicação foram recarregados com sucesso!"
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }
  addField<T extends SlashCommandOptionBase>(slashOption: T, option: Option) {
    return slashOption
      .setName(option.name.toLowerCase())
      .setDescription(option.description)
      .setRequired(option.required ? true : false);
  }
  addFields(data: SlashCommandBuilder, options?: Option[]) {
    options &&
      options.forEach((option) => {
        switch (option.type) {
          case OptionType.Boolean:
            data.addBooleanOption((slashOption) =>
              this.addField(slashOption, option)
            );
            break;
          case OptionType.Channel:
            data.addChannelOption((slashOption) =>
              this.addField(slashOption, option)
            );
            break;
          case OptionType.Integer:
            data.addIntegerOption((slashOption) => {
              const newSlashOption = this.addField(slashOption, option);

              option.choices &&
                option.choices.forEach((choice) =>
                  newSlashOption.addChoice(choice.name, parseInt(choice.value))
                );

              return newSlashOption;
            });
            break;
          case OptionType.Mention:
            data.addMentionableOption((slashOption) =>
              this.addField(slashOption, option)
            );
            break;
          case OptionType.Role:
            data.addRoleOption((slashOption) =>
              this.addField(slashOption, option)
            );
            break;
          case OptionType.String:
            data.addStringOption((slashOption) => {
              const newSlashOption = this.addField(slashOption, option);

              option.choices &&
                option.choices.forEach((choice) =>
                  newSlashOption.addChoice(choice.name, choice.value)
                );

              return newSlashOption;
            });
            break;
          case OptionType.User:
            data.addUserOption((slashOption) =>
              this.addField(slashOption, option)
            );
            break;
        }
      });
    return data;
  }
}

export default Rest;
