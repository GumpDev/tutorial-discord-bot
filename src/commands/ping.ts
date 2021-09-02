import Command from "../interfaces/Command";

export const ping: Command = {
  name: "ping",
  description: "responde com pong",
  run: async (interaction) => {
    await interaction.reply("PONG");
  },
};
