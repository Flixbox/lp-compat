import { appProjection, executeAppsQuery } from "./util";

export default async (page, pageSize) => {
  return await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection
        .find(
          {},
          {
            projection: appProjection,
          }
        )
        .sort({
          minInstalls: -1,
          _id: 1,
        })
        .skip(page * pageSize)
        .limit(pageSize)
        .toArray()
  );
};
