const { SlashCommandBuilder } = require("@discordjs/builders");

import {
  isStaff,
  processFeatures,
  processPackage,
  validatePackage,
} from "../util";
import addApp from "../../db/addApp";
import editApp from "../../db/editApp";
import { App } from "../../types";
import getPlaystoreData from "../../backend/getPlaystoreData";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upsertapp")
    .setDescription("Upsert (update or insert) a new app to the list!")
    .addStringOption((option) =>
      option
        .setName("package")
        .setDescription(
          "/help - Use the app's package name (e.g. com.gramgames.mergedragons) or the URL to the app."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("features")
        .setDescription(
          "/help - Use the predefined /features or create custom ones using the format ::<custom feature>."
        )
        .setRequired(true)
    ),

  execute: async (interaction, client) => {
    let packageParam: string = interaction.options.getString("package");
    let featuresString: string = interaction.options.getString("features");

    let appFilledWithPlayStoreData = 1

    const response = (content, ephemeral = false) =>
      interaction.editReply({ content, ephemeral });
    const error = (
      e = "Something isn't right. Please try again with different parameters."
    ) => response(e, true);

    /*
    if (!isStaff)
      return await error(
        "You don't have the `Compatibility List Manager` role. Sorry!"
      );
    */

    if (!packageParam) return await error();
    if (!featuresString) return await error();

    let features: ReturnType<typeof processFeatures>;
    let appId;

    const featuresError = async () =>
      error(
        "There is an issue with the list of features you provided. Please refer to the `/help` command for guidance."
      );

    try {
      features = processFeatures(featuresString);
    } catch (e) {
      return await featuresError();
    }

    if (!features) return await featuresError();

    try {
      appId = await processPackage(packageParam);
      if (!appId) throw new Error();
    } catch (e) {
      return await error(
        "There is an issue with the app package you provided. Make sure it is written correctly, or try using the URL to the app on the play store. You can also refer to the `/help` command for assistance."
      );
    }

    try {
      await getPlaystoreData(appId);
    } catch (e) {
      appFilledWithPlayStoreData = 0
      // return await error(
      //   "The app you provided cannot be found in the specified play store region. Please try again with a different app or region."
      // );
    }

    try {
      await addApp(
        { appId, features } as App,
        interaction.user.tag,
        interaction.user.id
      );
    } catch (e) {
      // The app is probably already on the list. Let's try to update it.
      try {
        await editApp(
          { appId, features } as App,
          interaction.user.tag,
          interaction.user.id
        );
      } catch (e) {
        return await error(
          `
          The app package ${appId} could not be updated. 
          Provided features: ${features.toString()}
          `
        );
      }
    }

    let textResponse = `Upserted (updated/inserted) app ${appId}!\nThanks ${interaction.user.tag}!`;
    if(!appFilledWithPlayStoreData)
      textResponse = `${textResponse}\nThe app was not found on the Play Store. The app's details must be filled in manually. (This is not possible yet)`;
    // if (isStaff(interaction))
    //   textResponse = `${textResponse}\nPR was automatically merged.`;

    return await interaction.editReply(textResponse);
  },
};
