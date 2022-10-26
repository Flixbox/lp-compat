const { SlashCommandBuilder } = require("@discordjs/builders");

import {
  isStaff,
  processFeatures,
  processPackage,
  validatePackage,
} from "../util";
import addApp from "../../db/addApp";
import { App } from "../../types";
import getPlaystoreData from "../../backend/getPlaystoreData";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addapp")
    .setDescription("Add a new app to the list!")
    .addStringOption((option) =>
      option
        .setName("package")
        .setDescription(
          "/help - Example: com.gramgames.mergedragons or play store URL"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("features")
        .setDescription(
          "/help - Example: iap|::Works with version 1.2.3 from APKPure"
        )
        .setRequired(true)
    ),

  execute: async (interaction, client) => {
    let packageParam: string = interaction.options.getString("package");
    let featuresString: string = interaction.options.getString("features");

    const response = (content, ephemeral = false) =>
      interaction.editReply({ content, ephemeral });
    const error = (
      e = "Something isn't right. Try again with different parameters."
    ) => response(e, true);

    /*
    if (!isStaff)
      return await error(
        "You don't have the `Compatibility List Manager` role. Sorry!"
      );
    */

    if (!packageParam) return await error();
    if (!featuresString) return await error();

    let features;
    let appId;
    try {
      features = await processFeatures(featuresString, interaction);
    } catch (e) {
      return await error(
        "Your feature list isn't right! Check /help for a guide."
      );
    }

    try {
      appId = await processPackage(packageParam);
      if (!features || !appId) throw new Error();
    } catch (e) {
      return await error(
        "Your app package isn't right! Maybe it's not written properly? Try putting in the play store URL to the app! Check /help as well."
      );
    }

    try {
      await getPlaystoreData(appId);
    } catch (e) {
      return await error("Your app can't be found in this play store region!");
    }

    try {
      await addApp(
        { appId, features } as App,
        interaction.user.tag,
        interaction.user.id
      );
    } catch (e) {
      return await error(
        "Your app package is probably already on the list! Check /help as well."
      );
    }

    let textResponse = `Added app ${appId}!\nThanks ${interaction.user.tag}!`;
    // if (isStaff(interaction))
    //   textResponse = `${textResponse}\nPR was automatically merged.`;

    return await interaction.editReply(textResponse);
  },
};
