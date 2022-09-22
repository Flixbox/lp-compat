import { executeAppsQuery } from "./util";

export default async () =>
  await executeAppsQuery(
    async (appsCollection) => await appsCollection.count()
  );
