import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("features")
    .setDescription("Show the features that you can add to an app"),
  execute: async (interaction, client) => {
    let textResponse = `Available features:`;
    const features = featureMap()
    Object.keys(features).forEach(
      (feature) => (textResponse = `${textResponse}\n${feature}\n*${features[feature].label}*`)
    );

    return await interaction.editReply(textResponse);
  },
};
