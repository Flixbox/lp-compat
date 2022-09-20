import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("features")
    .setDescription("Show the features that you can add to an app"),
  execute: async (interaction, client) => {
    let textResponse = `Available features:`;
    await interaction.editReply(textResponse);
    const features = featureMap();

    let queuedText = "";
    for (const [i, feature] of Object.keys(features).entries()) {
      queuedText = `${queuedText}\n**${feature}**\n*${features[feature].label}*`;
      if (i % 12 === 0 && i !== 0) {
        await interaction.followUp(queuedText);
        queuedText = "";
      }
    }
    if (queuedText) await interaction.followUp(queuedText);

    return await interaction.followUp(`
You can also create custom features using this syntax:
    
\`::Download version 1.2.3 on APKPure; then patch\`
    
\`warning::Don't click the fake ads - Please use AdGuard\`
    
\`success::IAP work with some minor restrictions\`
`);
  },
};
