import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("features")
    .setDescription("Show the features that you can add to an app"),
  execute: async (interaction, client) => {
    let textResponse = `Available features:`;
    const features = featureMap();
    Object.keys(features).forEach(
      (feature) =>
        (textResponse = `${textResponse}\n${feature}\n*${features[feature].label}*`)
    );
    textResponse = `${textResponse}

You can also create custom features using this syntax:

\`::Download version 1.2.3 on APKPure; then patch\`

\`warning::Don't click the fake ads - Please use AdGuard\`

\`success::IAP work with some minor restrictions\`
`;

    return await interaction.editReply(textResponse);
  },
};
