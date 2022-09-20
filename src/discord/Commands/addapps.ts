import getFeature from "../../featureMap";

import util from "util";

const exec = util.promisify(require("child_process").exec);
const { SlashCommandBuilder } = require("@discordjs/builders");

import {
  checkoutNewGitBranch,
  finalizePullRequest,
  insertApp,
  isStaff,
  processFeatures,
  processPackage,
  validatePackage,
} from "../util";
import { Interaction, InteractionType } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addapps")
    .setDescription("Add new apps to the list!")
    .addStringOption((option) =>
      option
        .setName("packages")
        .setDescription(
          "<package>@<features>|<package>@<features>|... - package: like com.gramgames.mergedragons -/features"
        )
        .setRequired(true)
    ),

  execute: async (interaction, client) => {
    let packages: string = interaction.options.getString("packages");

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

    if (!packages) return await error();

    const individualApps = packages.split("|");

    try {
      const branchName = await checkoutNewGitBranch();

      try {
        for (const fullAppParamString of individualApps) {
          const [packageId, features] = fullAppParamString.split("@");
          const processedPackage = await processPackage(packageId);
          const featuresString = await processFeatures(features, interaction);
          if (!featuresString || !processedPackage) throw new Error();

          await insertApp(processedPackage, featuresString);
        }
      } catch (e) {
        return await error("Your apps list is not right!");
      }

      await finalizePullRequest(
        branchName,
        `Bot - Add apps (added by ${interaction.user.tag})`,
        isStaff(interaction)
      );
    } catch (e) {
      console.error(e);
      return await error(
        "Couldn't push to the repo! Try again in 3 minutes, the CI needs some time to deploy."
      );
    }

    let textResponse = `Added apps!\nThanks ${interaction.user.tag}!\nPR has been created and will be verified by the mods.`;
    if (isStaff(interaction))
      textResponse = `${textResponse}\nPR was automatically merged.`;

    return await interaction.editReply(textResponse);
  },
};
