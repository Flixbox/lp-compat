import getFeature from "../../featureMap";
import insertLine from "insert-line";
import util from "util";
import { readFileSync } from "fs";

const exec = util.promisify(require("child_process").exec);
const { SlashCommandBuilder } = require("@discordjs/builders");

import {
  checkoutNewGitBranch,
  finalizePullRequest,
  isStaff,
  processFeatures,
  processPackage,
  validatePackage,
} from "../util";
import { Interaction, InteractionType } from "discord.js";

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
    let packageId: string = interaction.options.getString("packageid");
    const features: string = interaction.options.getString("features");

    const response = (content, ephemeral = false) =>
      interaction.editReply({ content, ephemeral });
    const error = (
      e = "Something isn't right. Try again with different parameters."
    ) => response(e, true);

    /*
    if (!isStaff)
      return await error(
        "You don't have the `Compatibility List Manager` role. Sorry!"
      );
    */

    if (!packageId || !features) return await error();

    const processedPackage = await processPackage(packageId);

    if (!processedPackage)
      return await error(
        "The app package ID is not right or is already on the list! It should look like this: com.gramgames.mergedragons"
      );

    const featuresString = await processFeatures(features, interaction);
    if (!featuresString)
      return await error("Your feature string is not right!");

    const fullLine = `  "${processedPackage}":{"features":[${featuresString}]},`;

    try {
      const branchName = await checkoutNewGitBranch();

      try {
        insertLine("./static/compat-data/apps.json")
          .contentSync(fullLine)
          .at(2);
      } catch (e) {
        console.error(e);
        return await error("Couldn't write to the app list!");
      }

      // Validate altered apps file
      const data = readFileSync("./static/compat-data/apps.json", "utf8");
      JSON.parse(data);

      await finalizePullRequest(
        branchName,
        "Bot - Add app ${processedPackage} (added by ${interaction.user.tag})",
        isStaff(interaction)
      );
    } catch (e) {
      console.error(e);
      return await error(
        "Couldn't push to the repo! Try again in 3 minutes, the CI needs some time to deploy."
      );
    }

    let textResponse = `Added the app \`${processedPackage}\`!\nFeatures: \`${featuresString}\`\nThanks ${interaction.user.tag}!\nPR has been created and will be verified by the mods.`;
    if (isStaff(interaction))
      textResponse = `${textResponse}\nPR was automatically merged.`;

    return await interaction.editReply(textResponse);
  },
};
