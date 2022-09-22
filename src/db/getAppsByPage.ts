import { appProjection, executeAppsQuery } from "./util";

export default async (page = 0) => {
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
        .skip(page * 10)
        .limit(10)
        .toArray()
  );
};
