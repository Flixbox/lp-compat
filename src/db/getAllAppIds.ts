import { executeAppsQuery } from "./util";

export default async () => {
  return await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection.find({}, { appId: 1 }).toArray()
  );
};
