const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("patching")
    .setDescription("Explains how to patch an app and links to the site."),
  execute: async (interaction, client) => {
    return await interaction.followUp(`
Before you start patching your apps, please inform yourself about what Lucky Patcher can and cannot do: https://flixbox.github.io/lp-compat/docs/lp-info
After reading this, check out the #resources channel for a recent download link.
After installing Lucky Patcher, check out this guide about patching an app: https://flixbox.github.io/lp-compat/docs/intro
Here's an incomplete list that contains several hundred apps that you can try patching: https://flixbox.github.io/lp-compat/

If you're having trouble, try patching Kingdom Rush TD.
Do you get the in-app purchases for free? Then you're doing everything right and the app you're trying to patch is likely incompatible.
You can't get the in-app purchases in Kingdom Rush TD for free? Check out the guide again from top to bottom. Maybe you forgot to install the patched app?
`);
  },
};
