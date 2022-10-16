import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A complete guide on how to use the bot"),
  execute: async (interaction, client) => {
    return await interaction.editReply(`
**/help**

This is the guide to the Lucky Patcher community bot.

When you execute commands, please make sure to use Slash Commands. 
Simply type / into the chat bar and click the command you wish to execute. 
Just typing /addapps will *not* work.

**/addapp**

This command allows you to an app to the compatibility list. 

After the app is verified, it will be added to the database.

*Syntax*

\`/addapp <package> <feature>|<feature>|...\`

*package*

You can either use the package name or the URL to the app on the play store. 
The package name is found when you tap "App info" in Lucky Patcher.

*features*

This is a pipe-separated list of notes on the app, like \`iap|facebook-login\` or just \`no-iap\`.
Make sure not to use any pipes in the feature description and take note to prefix any custom notes with \`::\`.
You can get a full list of predefined features using the \`features\` command.

*Examples*

\`/addapp com.gramgames.mergedragons iap|::Works with version 1.2.3 from APKPure\`

\`/addapp games.onebutton.golfbattle no-iap\`

\`/addapp https://play.google.com/store/apps/details?id=com.gramgames.mergedragons&hl=en&gl=us iap|facebook-login\`

**/features**

See here: http://localhost:3000/lp-compat/docs/Discordbot/Features

    `);
  },
};
