import { executeAppsQuery } from "./util";

export default async () => {
  return await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection
        .find(
          {},
          {
            projection: {
              appId: 1,
              features: 1,
              dateModified: 1,
              title: 1,
              icon: 1,
              installs: 1,
              scoreText: 1,
              url: 1,
              genre: 1,
              screenshots: 1,
              free: 1,
              priceText: 1,
            },
          }
        )
        .toArray()
  );
};
