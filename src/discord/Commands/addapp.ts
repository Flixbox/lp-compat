import getFeature from "../../featureMap";

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addapp")
    .setDescription("Add a new app to the list!")
    .addStringOption((option) =>
      option
        .setName("packageid")
        .setDescription(
          "The package ID can be found in the Lucky Patcher app info or in the Play Store URL of the app."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("features")
        .setDescription(
          "A list of notes under the app. Example 1: no-iap | Example 2: iap,warning::Download only on APKPure"
        )
        .setRequired(true)
    ),
  execute: async (interaction, client) => {
    const packageId = interaction.options.getString("packageid");
    const features = interaction.options.getString("features");

    const response = (content, ephemeral = false) =>
      interaction.reply({ content, ephemeral });
    const error = () =>
      response(
        "Something isn't right. Try again with different parameters.",
        true
      );

    if (!packageId || !features) return error();

    features.push(`::Added to list by ${interaction.user.tag}`);

    const featuresArray = features.split(",");
    // Some degree of validation
    try {
      featuresArray.forEach((feature) => {
        const feat = getFeature(feature);
        if (!feat.name) throw new Error();
      });
    } catch (e) {
      return error();
    }

    return response(
      `App "${packageId}" with features "${features}" added to the repo. The site usually takes 3 minutes to update.`
    );
  },
};
