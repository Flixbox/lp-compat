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

**/addapps**

This command allows you to add several apps to the compatibility list at once. 

After the apps are verified individually, a pull request with the new apps will be created.
The pull request will be automatically merged if a staff member executes this command, 
otherwise it will be reviewed and merged by a staff member manually.
Once the pull request is merged, the bot and the site will redeploy. 
This process takes about 3-4 minutes and the bot will be unusable for about a minute.

*Syntax*

\`/addapps <package>@<features>|<package>@<features>|...\`

*package*

You can either use the package name or the URL to the app on the play store. 
The package name is found when you tap "App info" in Lucky Patcher.

*features*

This is a comma-separated list of notes on the app, like \`iap,facebook-login\` or just \`no-iap\`.
Make sure not to use any commas in the list and take note to prefix any custom notes with \`::\`.
You can get a full list of predefined features using the \`features\` command.

*Examples*

\`/addapps com.gramgames.mergedragons@iap\`

\`/addapps games.onebutton.golfbattle@no-iap|com.mkarpenko.worldbox@no-iap\`

\`/addapps https://play.google.com/store/apps/details?id=com.gramgames.mergedragons&hl=en&gl=us@iap,facebook-login|games.onebutton.golfbattle@no-iap|com.mkarpenko.worldbox@no-iap\`

**/features**

Use the command to get a full list of available features.

    `);
  },
};
