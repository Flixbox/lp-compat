import getFeature from "../../featureMap";
import insertLine from "insert-line";

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
    const packageId: string = interaction.options.getString("packageid");
    const features: string = interaction.options.getString("features");

    const response = (content, ephemeral = false) =>
      interaction.reply({ content, ephemeral });
    const error = (
      e = "Something isn't right. Try again with different parameters."
    ) => response(e, true);

    if (!packageId || !features) return error();

    const featuresArray = features.split(",");
    featuresArray.push(`::Added to list by ${interaction.user.tag}`);

    // Some degree of validation
    try {
      featuresArray.forEach((feature) => {
        const feat = getFeature(feature);
        if (!feat.name) throw new Error();
      });
    } catch (e) {
      console.error(e);
      return error("Your feature string is not right!");
    }

    // TODO check if package exists

    try {
      insertLine("../../../static/compat-data/apps.json")
        .contentSync(
          `  "${packageId}":{"features":[${featuresArray.toString()}]},`
        )
        .at(2);
    } catch (e) {
      console.error(e);
      return error("Couldn't write to the app list!");
    }

    return response(
      `App "${packageId}" with features "${features}" added to the repo. The site usually takes 3 minutes to update. Line: "  "${packageId}":{"features":[${featuresArray.toString()}]},"`
    );
  },
};
