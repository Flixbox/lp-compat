import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const { SlashCommandBuilder } = require("@discordjs/builders");

const BUTTON_ID_SHOW_MORE = "cseShowMore";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cse")
    .setDescription(
      "Explain the CSE (Custom Search Engine) for modded APKs and how to use it."
    ),
  execute: async (interaction, client) => {
    const showMore = new ButtonBuilder()
      .setCustomId(BUTTON_ID_SHOW_MORE)
      .setLabel("Show more")
      .setStyle(ButtonStyle.Primary);

    const docLink = new ButtonBuilder()
      .setLabel("FMHY Android APKs")
      .setStyle(ButtonStyle.Link)
      .setURL("https://fmhy.pages.dev/android-iosguide#modded-apks");

    const row = new ActionRowBuilder().addComponents(showMore, docLink);

    // Listen for interaction events
    client.on("interactionCreate", async (interaction) => {
      // Check if the interaction is a button click and the custom ID matches
      if (
        interaction.isButton() &&
        interaction.customId === BUTTON_ID_SHOW_MORE
      ) {
        // Send an ephemeral message to the user who clicked the button
        await interaction.reply({
          content: `
To find a modded APK for an app that is incompatible with Lucky Patcher, you can visit the modded APK CSE in [freemediaheckyeah](https://fmhy.pages.dev/). 
You can find those under the Android / iOS section. 
Remember to use VirusTotal to check the downloaded file for viruses. 
If it's over 650MB, you can use the Avast app to check the file locally. 
Direct link: [Android APKs](https://fmhy.pages.dev/android-iosguide#modded-apks)

If you can't find the app in the CSE:
- If it's a multiplayer app, it's likely that the server-side logic would require the modder to implement a private server. Example: [nulls.gg](https://nulls.gg) - This is not possible for most smaller apps.
- If it's a singleplayer app, it's likely that the app just hasn't been patched yet. This can have several reasons - Strong anticheat, signature verification, or simply that no one has been interested in patching it. You can suggest in in the #mod-discussion channel.
                `,
          ephemeral: true,
        });
      }
    });

    return await interaction.followUp({
      content: `
Many apps are incompatible with Lucky Patcher.
- [FMHY is a decent resource for modded apps](<https://fmhy.pages.dev/android-iosguide#modded-apks>)
- [Private servers like nulls.gg are required for many server-based apps](<https://nulls.gg/>)
      `,
      components: [row],
    });
  },
};
