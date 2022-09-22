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
        .sort({ minInstalls: -1 })
        .skip(page * 10)
        .limit(10)
        .toArray()
  );
};
