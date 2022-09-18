const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  data: new SlashCommandBuilder()
    .setName("addapp")
    .setDescription("Add a new app to the list!"),
  execute: async (interaction, client) => {
    return interaction.reply({ content: `Pong \`${client.ws.ping}ms\` 🏓` });
  },
};
