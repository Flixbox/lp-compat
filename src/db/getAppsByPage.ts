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
        .sort("minInstalls")
        .skip(page * 10)
        .limit(10)
        .toArray()
  );
};
