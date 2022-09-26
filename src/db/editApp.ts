import { Response } from "express";
import sendDiscordUpdate from "../discord/sendDiscordUpdate";
import { App } from "../types";
import { executeAppsQuery, getUserDetails } from "./util";

const getPlaystoreData = require("../backend/getPlaystoreData").default;

export default async (app: App, req, res?: Response) => {
  console.log(app);
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

    await appsCollection.findOneAndReplace(
      { appId: app.appId },
      {
        ...newApp,
        dateModified: Date.now(),
        ...getUserDetails(req),
      }
    );

    const result = await appsCollection.findOne({ appId: app.appId });

    console.info(`set ${app.appId} with data`, newApp);

    await sendDiscordUpdate({ ...newApp }, "modified");

    console.log("Discord update sent! " + app.appId);

    return result;
  });
};
