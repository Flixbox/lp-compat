import { appProjection, executeAppsQuery } from "./util";

export default async (page = 0, pageSize = 20) => {
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
        .skip(page * pageSize)
        .limit(pageSize)
        .toArray()
  );
};
