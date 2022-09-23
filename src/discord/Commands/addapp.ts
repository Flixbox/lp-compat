const { SlashCommandBuilder } = require("@discordjs/builders");

import {
  isStaff,
  processFeatures,
  processPackage,
  validatePackage,
} from "../util";
import addApp from "../../db/addApp";
import { App } from "../../types";

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

    try {
      const appId = await processPackage(packageParam);
      const features = await processFeatures(featuresString, interaction);
      if (!features || !appId) throw new Error();

      await addApp({ appId, features } as App);
    } catch (e) {
      return await error("Your apps list is not right!");
    }

    let textResponse = `Added app!\nThanks ${interaction.user.tag}!\n.`;
    if (isStaff(interaction))
      textResponse = `${textResponse}\nPR was automatically merged.`;

    return await interaction.editReply(textResponse);
  },
};
