import { Client, GatewayIntentBits } from "discord.js";

const SERVER_ID = "631562721611218955";
const ADMIN_ROLE_ID = "631565243302019091";
const HELPER_ROLE_ID = "650110437073092640";
const EDITOR_ROLE_ID = "1022941047476731964";
const STAFF_ROLE_IDS = [ADMIN_ROLE_ID, HELPER_ROLE_ID, EDITOR_ROLE_ID];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.info("Bot is ready!");

  await client.guilds.fetch();
  const guild = client.guilds.cache.get(SERVER_ID);
  if (!guild) throw new Error("Guild not found!");

  await guild.members.fetch();

  const staff = guild.members.cache.filter((member) => {
    return STAFF_ROLE_IDS.some((roleId) => member.roles.cache.has(roleId));
  });

  console.info(
    "Staff members:",
    staff.map((member) => member.user.tag)
  );
});

client.login(process.env.DISCORD_TOKEN);
