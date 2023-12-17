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
        .project({
          _id: 1,
          dateModified: 1,
          appId: 1,
          features: 1,
          title: 1,
          installs: 1,
          free: 1,
          priceText: 1,
          scoreText: 1,
          genre: 1,
          icon: 1,
          url: 1,
          editedBy: 1,
        })
        .toArray()
  );
};
