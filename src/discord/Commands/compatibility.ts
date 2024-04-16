const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("compatibility")
    .setDescription(
      "Gives info on compatible apps for Lucky Patcher, with link to more detailed compatibility info."
    ),
  execute: async (interaction, client) => {
    return await interaction.followUp(`
    Some apps can be easily patched with Lucky Patcher to get free in-app purchases, while others cannot.
    Offline games are usually compatible, while games with heavy anti-cheat or online games are usually incompatible. However, there are a few exceptions!

    For more information about what Lucky Patcher can do, see this link: 
    <https://flixbox.github.io/lp-compat/docs/lp-info>

    We have already compiled a list of many compatible games here: 
    <https://flixbox.github.io/lp-compat/>
    
    If you would like to add your own games to the list, you can use the \`/upsertapp\` slash command. To use this command, simply type "/" into the chat and click the black 😉 emoji.
    `);
  },
};
