import getFeature from "../../featureMap";
import insertLine from "insert-line";
import util from "util";
const exec = util.promisify(require("child_process").exec);
const { SlashCommandBuilder } = require("@discordjs/builders");

const pat = process.env.GITHUB_PAT; // Token from Railway Env Variable.

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

    // TODO check if user has the right permissions

    if (!packageId || !features) return error();

    const featuresArray = features.split(",");
    featuresArray.push(`::Added to list by ${interaction.user.tag}`);

    // Some degree of validation
    try {
      featuresArray.forEach((feature) => {
        const feat = getFeature(feature);
        if (!feat.label) throw new Error();
      });
    } catch (e) {
      console.error(e);
      return error("Your feature string is not right!");
    }

    // TODO check if package exists

    let featuresString = "";
    featuresArray.forEach((feature, index) => {
      featuresString = `${featuresString}"${feature}"`;
      if (index !== featuresArray.length - 1) featuresString += ",";
    });

    const fullLine = `  "${packageId}":{"features":[${featuresString}]},`;

    // TODO Validate json file integrity

    try {
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
      console.log(`git fetch --all`);
      await exec(`git fetch --all`);
      console.log(`git checkout`);
      await exec(`git checkout -b main --track origin/main`);
      console.log(`git pull`);
      await exec(`git pull`);
      console.log(`git reset origin/main`);
      await exec(`git reset origin/main`);

      try {
        insertLine("./static/compat-data/apps.json")
          .contentSync(fullLine)
          .at(2);
      } catch (e) {
        console.error(e);
        return error("Couldn't write to the app list!");
      }

      await exec(`git add -A`);
      await exec(
        `git commit -m "Bot - Add app (added by ${interaction.user.tag})"`
      );
      await exec(
        `git push --set-upstream https://Flixbox:${pat}@github.com/Flixbox/lp-compat.git main`
      );
    } catch (e) {
      console.error(e);
      return error("Couldn't push to the repo!");
    }

    return response(
      `App "${packageId}" with features "${features}" added to the repo. The site usually takes 3 minutes to update. Line: "${fullLine}"`
    );
  },
};
