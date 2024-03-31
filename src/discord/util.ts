import { Client, GatewayIntentBits, Interaction } from "discord.js";
import axios from "axios";
import getFeature from "../featureMap";
import { v4 as uuidv4 } from "uuid";
import util from "util";
const exec = util.promisify(require("child_process").exec);
import insertLine from "insert-line";
import { readFileSync } from "fs";
import { request } from "undici";

const pat = process.env.GH_TOKEN; // Token from Railway Env Variable.
const discordToken = process.env.DISCORD_TOKEN; // Token from Railway Env Variable.

export const isStaff = (interaction) =>
  interaction.member.roles.cache.has("670375841523433472") ||
  interaction.member.id === interaction.guild.ownerId;

export const validatePackage = async (packageId: string) => {
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

export const processFeatures = (features: string) => {
  const featuresArray = features.split("|");

  // Some degree of validation for the features
  try {
    featuresArray.forEach((feature) => {
      const feat = getFeature(feature);
      if (!feat.label) throw new Error();
    });
  } catch (e) {
    return false;
  }

  return featuresArray;
};

/*
export const getDiscord = async (accessCode, req) => {
  const client = await new Client({
    clientID: "1021002998069067777",
    clientSecret: discordToken,
    scopes: ["identify", "guilds"],
    redirectURI: "https://flixbox.github.io/lp-compat/",
  });

  let accessToken;
  if (req.session.discordRefreshToken) {
    try {
      const refreshToken = req.session.discordRefreshToken;
      const tokenData = await client.refreshToken(refreshToken);
      accessToken = tokenData.accessToken;
      req.session.discordRefreshToken = tokenData.refreshToken;
    } catch (e) {}
  }
  if (!accessToken) {
    const tokenData = await client.getAccessToken(code);
    accessToken = tokenData.accessToken;
    req.session.discordRefreshToken = tokenData.refreshToken;
  }

  const user = await client.getUser(accessToken);
  const guilds = await client.getGuilds(accessToken);
  const userDetails = { user, guilds };
  req.session.userName = user.username;
  req.session.userId = user.id;

  return userDetails;
};
*/

export const getDiscord = async (accessCode: string, req: any) => {
  try {
    const tokenResponseData = await request(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        body: new URLSearchParams({
          client_id: "1021002998069067777",
          client_secret: discordToken,
          accessCode,
          grant_type: "authorization_code",
          redirect_uri: "https://flixbox.github.io/lp-compat/",
          scope: "identify",
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const oauthData = await tokenResponseData.body.json();
    console.log(oauthData);
  } catch (error) {
    // NOTE: An unauthorized token will not throw an error
    // tokenResponseData.statusCode will be 401
    console.error(error);
  }
};
