import { EmbedBuilder, WebhookClient } from "discord.js";
import { App } from "../types";
import getFeature from "../featureMap";

const hook = new WebhookClient({
  // url: process.env.DISCORD_WEBHOOK,
  url: process.env.DISCORD_WEBHOOK || "",
});

export default async (app: App) => {
  if (!app || !app.appId || !app.features || !app.title) return;

  const {
    features,
    appId,
    title,
    icon,
    installs,
    scoreText,
    url,
    genre,
    screenshots,
    free,
    priceText,
  } = app;

  let featuresString =
    "Website Update will be deployed in about 60 seconds.\nCompatibility:";
  features.forEach(
    (feature) => (featuresString += `\n${getFeature(feature.trim()).label}`)
  );

  let color = 0x0099ff;
  if (features.indexOf("iap") > -1) color = 0x388e3c;
  if (features.indexOf("no-iap") > -1) color = 0xf44336;
  if (features.indexOf("unclear-iap") > -1) color = 0xf57c00;

  const myEmbed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setURL(url)
    .setAuthor({
      name: "App updated on Compatibility List",
      url: "https://flixbox.github.io/lp-compat/",
    })
    .setDescription(featuresString)
    .setThumbnail(icon)
    .setTimestamp()
    .setFooter({
      text: "Got more compatible apps? Post them on this Discord and ping @Flixbox!",
    });

  console.log("Sending embed for " + title);
  hook.send({ embeds: [myEmbed] }).catch((e) => console.error(e));
};
