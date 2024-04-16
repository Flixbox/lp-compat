import { Response } from "express";
import sendDiscordUpdate from "../discord/sendDiscordUpdate";
import { App } from "../types";
import { executeAppsQuery, getUserDetails } from "./util";
import { processFeatures } from "../discord/util";

const getPlaystoreData = require("../backend/getPlaystoreData").default;

export default async (app: App, username, id, res?: Response) => {
  console.log(app);
  if (!app.features) throw new Error("No features found!");
  if (!processFeatures(app.features.join("|")))
    throw new Error("Invalid features array!");
  return await executeAppsQuery(async (appsCollection) => {
    const oldApp = await appsCollection.findOne({ appId: app.appId });
    if (!oldApp) {
      res && res.status(409).send();
      throw new Error(`App ${app.appId} doesn't exist!`);
    }
    console.info(`setting ${app.appId}`);

    let playStoreData: any;
    try {
      playStoreData = await getPlaystoreData(app.appId);
      // Update existing app with play store data
      // Only if property exists in the play store dataset
      for (let propertyName in oldApp)
        playStoreData[propertyName] &&
          (oldApp[propertyName] = playStoreData[propertyName]);
      for (let propertyName in app)
        playStoreData[propertyName] &&
          oldApp[propertyName] &&
          (app[propertyName] = oldApp[propertyName]);
    } catch (e) {
      console.error(
        `Editing App ${app.appId} - Play Store data not found! - User ${username}, ID ${id}`
      );
      // Ignore error. App might be old and no longer in play store
    }

    const newApp = {
      ...oldApp,
      ...app,
    };

    delete newApp._id;

    console.log("getUserDetails", getUserDetails(username, id));

    const newDataset = {
      ...newApp,
      dateModified: Date.now(),
      ...getUserDetails(username, id),
    };

    console.info("Replacing app in DB with new dataset ", newDataset);

    await appsCollection.findOneAndReplace({ appId: app.appId }, newDataset);

    const result = await appsCollection.findOne({ appId: app.appId });

    console.info(`set ${app.appId} with data`, newApp);

    await sendDiscordUpdate(newDataset, "modified");

    console.log("Discord update sent! " + app.appId);

    return result;
  });
};
