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
    const foundApp = await appsCollection.findOne({ appId: app.appId });
    if (!foundApp) {
      res && res.status(409).send();
      throw new Error(`App ${app.appId} doesn't exist!`);
    }
    console.info(`setting ${app.appId}`);

    const newApp = {
      ...foundApp,
      ...app,
    };

    delete newApp._id;

    console.log("getUserDetails", getUserDetails(username, id));

    const newDataset = {
      ...newApp,
      dateModified: Date.now(),
      ...getUserDetails(username, id),
    };

    await appsCollection.findOneAndReplace({ appId: app.appId }, newDataset);

    const result = await appsCollection.findOne({ appId: app.appId });

    console.info(`set ${app.appId} with data`, newApp);

    await sendDiscordUpdate(newDataset, "modified");

    console.log("Discord update sent! " + app.appId);

    return result;
  });
};
