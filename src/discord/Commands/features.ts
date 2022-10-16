const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("features")
    .setDescription("Show the features that you can add to an app"),
  execute: async (interaction) => {
    return await interaction.followUp(
      `See here: http://localhost:3000/lp-compat/docs/Discordbot/Features`
    );
  },
};
