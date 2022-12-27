const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("patching")
    .setDescription("Instructions for patching an app, with link to more info on the process."),
  execute: async (interaction, client) => {
    return await interaction.followUp(`
    Before you start modifying your apps, it's important to understand what Lucky Patcher is capable of and what it can't do. To do this, you can read the information available at the following link:'
    <https://flixbox.github.io/lp-compat/docs/lp-info>
    
    After reading this information, you can use the following link to download the most recent version of the Lucky Patcher installer:
    <http://chelpus.com/luckypatcher/LuckyPatcherInstaller.apk>
    
    Once you have installed Lucky Patcher, you can refer to this guide for instructions on how to patch an app:
    <https://flixbox.github.io/lp-compat/docs/intro>
    
    There is also a list of hundreds of apps that you can try patching available at the following link:
    <https://flixbox.github.io/lp-compat/>
    
    If you're having trouble with the patching process, you can try using Kingdom Rush TD as a test. You can download Kingdom Rush TD from the following link:
    <https://play.google.com/store/apps/details?id=com.ironhidegames.android.kingdomrush>
    
    If you are able to get in-app purchases for free in Kingdom Rush TD, this means that you are using Lucky Patcher correctly. However, it is possible that the app you are attempting to patch is not compatible with Lucky Patcher. If you are unable to get in-app purchases for free in Kingdom Rush TD, it is possible that you missed a step in the patching process or forgot to install the patched app. In this case, you should review the guide again carefully to ensure that you have followed all of the necessary steps.
    `);
  },
};
