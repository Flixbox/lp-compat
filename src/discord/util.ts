import { Interaction } from "discord.js";
import apps from "../../static/compat-data/apps.json";
import axios from "axios";
import getFeature from "../featureMap";

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
