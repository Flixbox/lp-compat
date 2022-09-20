import { Interaction } from "discord.js";
import apps from "../../static/compat-data/apps.json";
import axios from "axios";
import getFeature from "../featureMap";
import { v4 as uuidv4 } from "uuid";
import util from "util";
const exec = util.promisify(require("child_process").exec);

const pat = process.env.GH_TOKEN; // Token from Railway Env Variable.

export const isStaff = (interaction) =>
  interaction.member.roles.cache.has("670375841523433472") ||
  interaction.member.id === interaction.guild.ownerId;

export const validatePackage = async (packageId: string) => {
  if (apps[packageId]) return false;
  try {
    await axios.get(
      `https://play.google.com/store/apps/details?id=${packageId}`
    );
  } catch (e) {
    return false;
  }
};

export const processPackage = async (packageParam: string) => {
  let packageId = packageParam;
  // packageId could be a URL, we should handle that properly.
  try {
    var url = new URL(packageId);
    var id = url.searchParams.get("id");
    packageId = id;
  } catch (e) {}
  if (validatePackage(packageId)) return packageId;
  return false;
};

export const processFeatures = async (
  features: string,
  interaction: Interaction
) => {
  const featuresArray = features.split(",");
  featuresArray.push(`::Added to list by ${interaction.user.tag}`);

  // Some degree of validation for the features
  try {
    featuresArray.forEach((feature) => {
      const feat = getFeature(feature);
      if (!feat.label) throw new Error();
    });
  } catch (e) {
    return false;
  }

  let featuresString = "";
  featuresArray.forEach((feature, index) => {
    featuresString = `${featuresString}"${feature}"`;
    if (index !== featuresArray.length - 1) featuresString += ",";
  });
  return featuresString;
};

export const checkoutNewGitBranch = async () => {
  const interactionId = uuidv4();
  const branchName = `feature/bot-branch-${interactionId}`;

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

  return branchName;
};

export const finalizePullRequest = async (
  branchName,
  message = "Bot - Compatibility list update from Discord",
  autoMerge = false
) => {
  await exec(`git add -A`);
  await exec(`git commit -m "${message}`");
  await exec(
    `git push --set-upstream https://Flixbox:${pat}@github.com/Flixbox/lp-compat.git "${branchName}"`
  );
  console.log(
    `git push --set-upstream https://Flixbox:PAT@github.com/Flixbox/lp-compat.git "${branchName}" done`
  );
  const { stdout } = await exec(
    `gh pr create --base main --head "${branchName}" --fill`
  );
  if (autoMerge) await exec(`gh pr merge --auto -r`);
};
