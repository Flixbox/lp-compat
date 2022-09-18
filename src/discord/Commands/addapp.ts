const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addapp")
    .setDescription("Add a new app to the list!")
    .addStringOption((option) =>
      option
        .setName("packageid")
        .setDescription(
          "The package ID can be found in the Lucky Patcher app info or in the Play Store URL of the app."
        )
    )
    .addStringOption((option) =>
      option
        .setName("features")
        .setDescription(
          "A list of notes under the app. Example 1: no-iap | Example 2: iap,warning::Download only on APKPure"
        )
    ),
  execute: async (interaction, client) => {
    const packageId = interaction.options.getString("packageid");
    const features = interaction.options.getString("features");

    const respond = (content, ephemeral = false) =>
      interaction.reply({ content, ephemeral });
    const error = () =>
      respond(
        "Something isn't right. Try again with different parameters.",
        true
      );

    if (!packageId || !features) return error();
  },
};
