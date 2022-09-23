import { featureMap } from "../../featureMap";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("compatibility")
    .setDescription(
      "Explains which apps are compatible and links to the site."
    ),
  execute: async (interaction, client) => {
    return await interaction.followUp(`
Some apps can easily be patched with Lucky Patcher to get free in-app purchases and some cannot.
The ones which are usually compatible are offline games, incompatible ones are usually games with heavy anti-cheat or online games. However, there are a few exceptions!
We've found many compatible games already, here's a link: https://flixbox.github.io/lp-compat/
If you'd like to add your own games to the list, use the \`/addapp\` slash command. Just enter \`/\` into the chat and click the black 😉 emoji.
`);
  },
};
