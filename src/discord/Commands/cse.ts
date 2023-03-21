const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cse")
    .setDescription(
      "Explain the CSE (Custom Search Engine) for modded APKs and how to use it."
    ),
  execute: async (interaction) => {
    return await interaction.followUp(
      `
To find a modded APK for an app that is incompatible with Lucky Patcher, you can visit the modded APK CSE in [r/freemediaheckyeah](https://www.reddit.com/r/freemediaheckyeah/). 
You can find those under: Wiki (pinned post) > Android / iOS > Android APKs. 
Remember to use VirusTotal to check the downloaded file for viruses. 
If it's over 650MB, you can use the Avast app to check the file locally. 
Direct link: [Android APKs](https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android/#wiki_.25BA_android_apks)
      `
    );
  },
};
