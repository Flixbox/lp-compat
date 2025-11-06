const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  data: new SlashCommandBuilder()
    .setName("features")
    .setDescription("Show the features that you can add to an app"),
  execute: async (interaction) => {
    return await interaction.followUp(
      `See here: https://flixbox.github.io/lp-compat/docs/Discordbot/Features`
    );
  },
};
