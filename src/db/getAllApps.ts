import { appProjection, executeAppsQuery } from "./util";

export default async () => {
  return await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection
        .find(
          {},
          {
            projection: appProjection,
          }
        )
        .sort("installs")
        .toArray()
  );
};
