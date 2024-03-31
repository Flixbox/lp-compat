import { executeStaffQuery } from "./util";

export default async () => {
  return await executeStaffQuery(
    async (staffCollection) => await staffCollection.find().toArray()
  );
};
