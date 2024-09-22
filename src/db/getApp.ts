import { appProjection, executeAppsQuery } from "./util";

export default async (appId) => {
  return await executeAppsQuery(
    async (appsCollection) => await appsCollection.findOne({ appId }, {
      projection: appProjection,
    })
  );
};
