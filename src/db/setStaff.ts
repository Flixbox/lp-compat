import { executeStaffQuery } from "./util";
import { Collection, GuildMember } from "discord.js";

export default async (staff: Collection<string, GuildMember>) => {
  return await executeStaffQuery(async (staffCollection) => {
    await staffCollection.deleteMany({});
    await staffCollection.insertMany(staff.map((member) => ({ ...member })));
  });
};
