import { type App, getFeature } from "@lp-compat/shared";

const sendDiscordUpdate = async (
  app: App,
  change = "added",
  webhookUrl?: string,
) => {
  if (!app || !app.appId || !app.features || !app.title) return;

  const { features, title, icon, url, editedBy } = app;

  const hookUrl =
    webhookUrl ||
    (typeof process !== "undefined"
      ? (process.env as unknown as { DISCORD_WEBHOOK: string })?.DISCORD_WEBHOOK
      : undefined) ||
    "";
  if (!hookUrl) return;

  let featuresString = "\nCompatibility:";
  features.forEach((feature) => {
    featuresString += `\n${getFeature(feature.trim()).label}`;
  });

  let color = 0x0099ff;
  if (features.indexOf("iap") > -1) color = 0x388e3c;
  if (features.indexOf("no-iap") > -1) color = 0xf44336;
  if (features.indexOf("unclear-iap") > -1) color = 0xf57c00;

  const embed = {
    title,
    url,
    description: `${featuresString}\n------------------------\nGot more compatible apps? Log in on the [compat list site](https://flixbox.github.io/lp-compat/) and add them!`,
    color,
    thumbnail: { url: icon },
    author: {
      name:
        change === "added"
          ? `App added on Compatibility List by ${editedBy?.userName}`
          : `App changed on Compatibility List by ${editedBy?.userName}`,
      url: "https://flixbox.github.io/lp-compat/",
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(hookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (e) {
    // Keep non-blocking behavior and log errors
    console.error(e);
  }
};

export { sendDiscordUpdate };
