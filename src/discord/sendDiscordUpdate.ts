import { EmbedBuilder, WebhookClient } from "discord.js";
import { App } from "../types";
import getFeature from "../featureMap";



export default async (app: App, change = "added", webhookUrl?: string) => {
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
    editedBy,
  } = app;

  const hook = new WebhookClient({
    url: webhookUrl || process.env.DISCORD_WEBHOOK || "",
  });

  let featuresString = "\nCompatibility:";
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
      name:
        change === "added"
          ? `App added on Compatibility List by ${editedBy?.userName}`
          : `App changed on Compatibility List by ${editedBy?.userName}`,
      url: "https://flixbox.github.io/lp-compat/",
    })
    .setDescription(
      `${featuresString}\n------------------------\nGot more compatible apps? Log in on the [compat list site](https://flixbox.github.io/lp-compat/) and add them!`
    )
    .setThumbnail(icon)
    .setTimestamp();

  console.log("Sending embed for " + title);

  hook.send({ embeds: [myEmbed] }).catch((e) => console.error(e));
};
