import { executeStaffQuery } from "./util";
import { Collection, GuildMember } from "discord.js";

export default async (staff: Collection<string, GuildMember>) => {
  return await executeStaffQuery(async (staffCollection) => {
    await staffCollection.deleteMany({});
    await staffCollection.insertMany(
      staff.map((member) => ({
        id: member.id,
        name: member.user.username,
        roles: member.roles.cache.map((role) => ({
          id: role.id,
          name: role.name,
        })),
      }))
    );
  });
};
