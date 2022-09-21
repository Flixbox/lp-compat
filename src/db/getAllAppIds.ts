import { executeAppsQuery } from "./util";

export default async () => {
  console.log("all ids");
  return await executeAppsQuery(
    async (appsCollection) =>
      await appsCollection.find({}, { projection: { appId: 1 } }).toArray()
  );
};
