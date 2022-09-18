import { REST } from "@discordjs/rest";
import { Routes } from "discord.js"; // Define Client, Intents, and Collection.
import importDir from "directory-import";

const commands = []; // Where the bot (slash) commands will be stored.
const token = process.env.DISCORD_TOKEN; // Token from Railway Env Variable.
const clientId = "1021002998069067777";

importDir(
  { directoryPath: "./Commands" },
  (moduleName, modulePath, command) => {
    console.info({ moduleName, modulePath, command });
    commands.push(command.data.toJSON()); // Push the command data to an array (for sending to the API).
  }
);

const rest = new REST({ version: "10" }).setToken(token);

// Register slash commands.
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
console.log(`Logged in!`);
