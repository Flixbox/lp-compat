import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A comprehensive guide to using the bot."),
  execute: async (interaction, client) => {
    return await interaction.editReply(`
    The Lucky Patcher community bot has the following commands available:
    **/help** - *Displays this guide.*
    **/patching** - *Explains how to patch an app and links to the site.*
    **/upsertapp** - *Allows you to add an app to the compatibility list. After the app is verified, it will be added to the database.*
    \`\`\`
    Syntax: 
    /upsertapp <package>  <feature>|<feature>|...
      package: You can either use the package name or the URL to the app on the play store. The package name can be found by tapping "App info" in Lucky Patcher.
      features: This is a list of notes on the app, separated by a pipe symbol (|). Do not use pipes in the feature description, and use "::" to prefix any custom notes. You can get a full list of predefined features using the "features" command.
      
    Examples: 
    /upsertapp com.gramgames.mergedragons iap|::Works with version 1.2.3 from APKPure 
    /upsertapp games.onebutton.golfbattle no-iap 
    /upsertapp https://play.google.com/store/apps/details?id=com.gramgames.mergedragons iap|facebook-login
    \`\`\`

    **/features** - *Displays a list of predefined features that can be used with the "upsertapp" command.*

    __To use these commands, make sure to use Slash Commands by typing "/" into the chat bar and selecting the desired command. Simply typing the command without the slash (e.g. "addapp") will not work.__
    `);
  },
};
