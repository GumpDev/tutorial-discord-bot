import Command, { OptionType } from "../interfaces/Command";

export const ping: Command = {
  name: "ping",
  description: "responde com pong",
  options: [
    {
      name: "nome",
      description: "nome da pessoa que vai receber o pong",
      type: OptionType.String,
      required: true,
      choices: [
        {
          name: "Gump",
          value: "gump",
        },
        {
          name: "Discord",
          value: "discord",
        },
      ],
    },
  ],
  run: async (interaction) => {
    const nome = interaction.options.data[0].value;

    await interaction.reply(`PONG ${nome}`);
  },
};
