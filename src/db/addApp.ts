import { Response } from "express";
import sendDiscordUpdate from "../discord/sendDiscordUpdate";
import { App } from "../types";
import { executeAppsQuery } from "./util";

const getPlaystoreData = require("../backend/getPlaystoreData").default;

export default async (app: App, res?: Response) => {
  console.log(app);
  return await executeAppsQuery(async (appsCollection) => {
    if (await appsCollection.findOne({ appId: app.appId })) {
      res && res.status(409).send();
      throw new Error(`App ${app.appId} already exists!`);
    }
    const playStoreData = await getPlaystoreData(app.appId);
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
    await appsCollection.insertOne({
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
      icon,
      headerImage,
      screenshots,
      adSupported,
      updated,
      version,
      recentChanges,
      url,
    });

    const result = await appsCollection.findOne({ appId: app.appId });

    console.info(`added ${app.appId}`);

    await sendDiscordUpdate({ ...app, ...playStoreData });

    console.log("Discord update sent! " + app.appId);

    return result;
  });
};
