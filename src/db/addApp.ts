import { Response } from "express";
import sendDiscordUpdate from "../discord/sendDiscordUpdate";
import { App } from "../types";
import { executeAppsQuery, getUserDetails } from "./util";
import { processFeatures } from "../discord/util";

const getPlaystoreData = require("../backend/getPlaystoreData").default;

export default async (app: App, userName, userId, res?: Response) => {
  console.log(app);
  if (!app.features) throw new Error("No features found!");
  if (!processFeatures(app.features.join("|")))
    throw new Error("Invalid features array!");
  return await executeAppsQuery(async (appsCollection) => {
    if (await appsCollection.findOne({ appId: app.appId })) {
      res && res.status(409).send();
      console.error(`App ${app.appId} already exists!`);
      throw new Error(`App ${app.appId} already exists!`);
    }
    let playStoreData;
    try {
      playStoreData = await getPlaystoreData(app.appId);
    } catch (e) {
      console.error(`App ${app.appId} - Play Store data not found!`);
      throw e;
    }
    const {
      title,
      summary,
      installs,
      minInstalls,
      price,
      free,
      priceText,
      androidVersion,
      androidVersionText,
      developer,
      score,
      scoreText,
      developerId,
      genre,
      genreId,
      categories,
      icon,
      headerImage,
      screenshots,
      adSupported,
      updated,
      version,
      recentChanges,
      url,
    } = playStoreData;
    console.info(`adding ${app.appId}`);
    const dataset = {
      dateModified: Date.now(),
      ...app,
      title,
      summary,
      installs,
      minInstalls,
      price,
      free,
      priceText,
      androidVersion,
      androidVersionText,
      score,
      scoreText,
      developer,
      developerId,
      genre,
      genreId,
      categories,
      icon,
      headerImage,
      screenshots,
      adSupported,
      updated,
      version,
      recentChanges,
      url,
      ...getUserDetails(userName, userId),
    };

    await appsCollection.insertOne(dataset);

    const result = await appsCollection.findOne({ appId: app.appId });

    console.info(`added ${app.appId}`);

    await sendDiscordUpdate({ ...dataset, ...playStoreData });

    console.log("Discord update sent! " + app.appId);

    return result;
  });
};
