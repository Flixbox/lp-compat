import { executeAppsQuery } from "./util";

const getPlaystoreData = require("../backend/getPlaystoreData");

export default async (app) => {
  await executeAppsQuery(async (appsCollection) => {
    if (await appsCollection.findOne({ appId: app.appId }))
      throw new Error("App already exists!");
    const playstoreData = await getPlaystoreData(app.appId);
    console.info(`adding ${app.appId}`);
    return await appsCollection.insertOne({
      ...app,
      ...playstoreData,
    });
  });

  console.info(`added ${app.appId}`);
};
