import { REST } from "@discordjs/rest";
import { Routes, Client, GatewayIntentBits, Collection } from "discord.js";
import importDir from "directory-import";

// TODO command to edit an app

type Command = { data: any; execute: (interaction, client) => any };

let setUpComplete = false;
const commands = []; // Where the bot (slash) commands will be stored.
const token = process.env.DISCORD_TOKEN; // Token from Railway Env Variable.
console.info(token);
const clientId = "1021002998069067777";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const clientCommands = new Collection<string, Command>(); // Client commands contain the logic that is executed on the client

importDir(
  { directoryPath: "./Commands" },
  (moduleName, modulePath, command: Command) => {
    console.info({ moduleName, modulePath, command });
    commands.push(command.data.toJSON()); // Push the command data to an array (for sending to the API).
    clientCommands.set(command.data.name, command);
  }
);

console.info(commands);

console.info("clientCommands", clientCommands);

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

  console.log("Set up complete and ready for commands!");
  setUpComplete = true;
})();

client.on("interactionCreate", async (interaction: any) => {
  if (!interaction.isCommand()) return;
  await interaction.deferReply();
  if (!setUpComplete)
    return await interaction.editReply({
      content: `Bot is still deploying, try again in 30 seconds!`,
      ephemeral: true,
    });

  const command = clientCommands.get(interaction.commandName);

  if (!command)
    await interaction.editReply({
      content: `Could not find command "${interaction.commandName}"!`,
      ephemeral: true,
    });

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token); // Login to the bot client via the defined "token" string.
