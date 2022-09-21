import { executeAppsQuery } from "./util";

const getPlaystoreData = require("../backend/getPlaystoreData");

export default async (app) => {
  const playstoreData = await getPlaystoreData(app.appId);
  await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection.insertOne({
        ...app,
        ...playstoreData,
      })
  );

  console.info(`added ${app.appId}`);
};
