import getFeature from "../../featureMap";
import insertLine from "insert-line";
import util from "util";
import https from "https";
import { readFile } from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const exec = util.promisify(require("child_process").exec);
const { SlashCommandBuilder } = require("@discordjs/builders");

const pat = process.env.GITHUB_TOKEN; // Token from Railway Env Variable.

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

    if (
      !interaction.member.roles.cache.has("670375841523433472") &&
      interaction.member.id !== interaction.guild.ownerId
    )
      return await error(
        "You don't have the `Compatibility List Manager` role. Sorry!"
      );

    if (!packageId || !features) return await error();

    const featuresArray = features.split(",");
    featuresArray.push(`::Added to list by ${interaction.user.tag}`);

    // Some degree of validation for the features
    try {
      featuresArray.forEach((feature) => {
        const feat = getFeature(feature);
        if (!feat.label) throw new Error();
      });
    } catch (e) {
      console.error(e);
      return await error("Your feature string is not right!");
    }

    // packageId could be a URL, we should handle that properly.
    try {
      var url = new URL(packageId);
      var id = url.searchParams.get("id");
      packageId = id;
    } catch (e) {}

    try {
      await axios.get(
        `https://play.google.com/store/apps/details?id=${packageId}`
      );
    } catch (e) {
      console.error(e);
      return await error(
        "The app package ID is not right! It should look like this: com.gramgames.mergedragons"
      );
    }

    let featuresString = "";
    featuresArray.forEach((feature, index) => {
      featuresString = `${featuresString}"${feature}"`;
      if (index !== featuresArray.length - 1) featuresString += ",";
    });

    const fullLine = `  "${packageId}":{"features":[${featuresString}]},`;

    const interactionId = uuidv4();
    const branchName = `feature/addapp-${interactionId}`;

    try {
      await exec(`nix-env -iA hub`);
      console.log(`git init`);
      await exec(`git init`);
      console.log(`git config --global user.email "felix@tietjen.it"`);
      await exec(`git config --global user.email "felix@tietjen.it"`);
      await exec(`git config --global user.name "LP Railway CI"`);
      try {
        console.log(`git remote add origin`);
        await exec(
          `git remote add origin https://Flixbox:${pat}@github.com/Flixbox/lp-compat.git`
        );
      } catch (e) {
        console.log(`git remote set-url origin`);
        await exec(
          `git remote set-url origin https://Flixbox:${pat}@github.com/Flixbox/lp-compat.git`
        );
      }
      console.log(`git fetch --depth=1`);
      await exec(`git fetch --depth=1`);
      console.log(`git checkout`);
      await exec(`git checkout -f -B main --track origin/main`);
      console.log(`git checkout done`);
      await exec(`git checkout -B "${branchName}"`);
      console.log(`git checkout -B "${branchName}" done`);

      try {
        insertLine("./static/compat-data/apps.json")
          .contentSync(fullLine)
          .at(2);
      } catch (e) {
        console.error(e);
        return await error("Couldn't write to the app list!");
      }

      readFile("./static/compat-data/apps.json", "utf8", function (err, data) {
        JSON.parse(data);
      });

      await exec(`git add -A`);
      await exec(
        `git commit -m "Bot - Add app ${packageId} (added by ${interaction.user.tag})"`
      );
      await exec(
        `git push --set-upstream https://Flixbox:${pat}@github.com/Flixbox/lp-compat.git "${branchName}"`
      );
      console.log(
        `git push --set-upstream https://Flixbox:PAT@github.com/Flixbox/lp-compat.git "${branchName}" done`
      );
      await exec(
        `hub pull-request --base main --head "${branchName}" --no-edit`
      );
    } catch (e) {
      console.error(e);
      return await error(
        "Couldn't push to the repo! Try again in 3 minutes, the CI needs some time to deploy."
      );
    }

    return await interaction.editReply(
      `Added the app \`${packageId}\`!\nFeatures: \`${featuresString}\`\nThanks ${interaction.user.tag}!\nPR has been created and will be verified by the mods.`
    );
  },
};
