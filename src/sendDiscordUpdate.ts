import util from "util";
const exec = util.promisify(require("child_process").exec);
import { AttachmentBuilder, EmbedBuilder, WebhookClient } from "discord.js";
import featureMap from "./featureMap";
const playstore = require("../static/compat-data/playstore.json");

console.log("cwd", process.cwd());

const hook = new WebhookClient({
  // url: process.env.DISCORD_WEBHOOK,
  url: process.env.DISCORD_WEBHOOK,
});
const logoPath = "./static/img/favicon.ico";
const logo = new AttachmentBuilder(logoPath);

const featureMapInitialized = featureMap();

const main = async () => {
  const { stdout, stderr, error } = await exec(
    `git diff ${process.env.GITHUB_BEFORE} HEAD -- ./static/compat-data/apps.json`
  );
  console.error(error);
  console.error(stderr);
  console.log(stdout);
  if (!stdout) return;
  const lines = stdout.split("\n");
  await lines.forEach(async (line) => {
    const fullLineRegex = /\+  \"(.*?)\"(.*)+/g;
    const featuresRegex = /(?:\"features\":) ?(?:\[) ?(.*) ?(?:\" ?\])/g;
    const result = fullLineRegex.exec(line);
    if (!result) return;
    const appId = result[1];
    console.log("RESULT FOUND - appId: ", appId);
    const featuresResult = featuresRegex.exec(line);
    if (!featuresResult) return;
    const features = featuresResult[1].replace(/\"/g, "").split(",");
    console.log("RESULT FOUND - featuresResult: ", features);

    const {
      title,
      icon,
      installs,
      scoreText,
      url,
      genre,
      screenshots,
      free,
      priceText,
    } = playstore[appId];

    let featuresString =
      "Website Update will be deployed in about 60 seconds.\nCompatibility:";
    features.forEach(
      (feature) =>
        (featuresString += `\n${featureMapInitialized[feature.trim()].label}`)
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

    await new Promise((f) => setTimeout(f, 500));
  });
};


main();
