const snoowrap = require("snoowrap");
import { sortBy } from "lodash";
import moment from "moment";
import util from "util";
import { writeFile } from "fs";
const exec = util.promisify(require("child_process").exec);
import featureMap from "./featureMap";
const playstore = require("../static/compat-data/playstore.json");

console.log("cwd", process.cwd());
const featureMapInitialized = featureMap();
const dateString = moment().format("YYYY-W");
const MAX_REDDIT_POST_LENGTH = 39999;

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const r = new snoowrap({
  userAgent: "github-ci:luckypatcher-bot:v0.1 (by /u/RubbelDieKatz94)",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

// That's the entire setup process, now you can just make requests.

const main = async () => {
  const { markdownTable } = await import("markdown-table");

  const updateFilePath = `/docs/updates/Update_${dateString}.md`;

  {
    const { stdout, stderr, error } = await exec(`git fetch --all`);
    console.error(error);
    console.error(stderr);
    console.log(stdout);
  }
  const { stdout, stderr, error } = await exec(
    `git diff "origin/main@{5 days ago}" HEAD -U0 -w -- ./static/compat-data/apps.json`
  );
  console.error(error);
  console.error(stderr);
  console.log(stdout);
  if (!stdout) return;
  const lines = stdout.split("\n");

  let text = `
\nThis weekly post summarizes the changes in the [Lucky Patcher Compatibility List](https://flixbox.github.io/lp-compat/) over the past week. If you have any additions (apps that are compatible or incompatible), feel free to comment here or in the [Discord](https://discord.gg/RS5ddYf7mw).

There might be caveats, special conditions, and other advice about these apps on the compatibility list. Before patching one of these apps, definitely check it out on the site!

You can also find the full list of updated apps [here](https://flixbox.github.io/lp-compat${updateFilePath}).

-----------------------

The IAP column describes if you can get In-App purchases for free.

🤖 means that a root patch will most likely be required for IAP to work.

❓ means that we need someone to verify if the IAP patch works. Please post here or in the Discord if you have any results!
`;

  const tableHeadings = ["App", "IAP", "⭐", "Downloads"];
  const tableRows = [];
  const tableAlign = ["l", "c", "l", "r"];

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
    if (!playstore[appId]) return;

    const {
      title,
      icon,
      installs,
      minInstalls,
      scoreText,
      url,
      genre,
      screenshots,
      free,
      priceText,
    } = playstore[appId];

    const row = [`[${title}](${url})`, "❓", scoreText, installs, minInstalls];

    if (features.indexOf("iap") > -1) row[1] = "✅";
    if (features.indexOf("no-iap") > -1) row[1] = "❌";
    if (
      features.indexOf("root-patch") > -1 ||
      features.indexOf("may-require-root") > -1
    )
      row[1] = "🤖";

    tableRows.push(row);
  });

  const sorting = {
    "✅": 1,
    "🤖": 2,
    "❓": 3,
    "❌": 4,
  };

  const sortedTableRows = sortBy(
    // Sort by downloads first
    sortBy(tableRows, (e) => -e[4]),
    // Then sort by IAP
    (e) => sorting[e[1]]
  );
  // then remove the numerical downloads (it was just a sorting helper)
  sortedTableRows.forEach((e) => e.pop());

  console.log(sortedTableRows);

  const table = markdownTable([tableHeadings, ...sortedTableRows], {
    align: tableAlign,
  });

  text = `${text}\n\n${table}`;

  writeFile(`.${updateFilePath}`, text, () => undefined);

  const redditPostText =
    text.length > MAX_REDDIT_POST_LENGTH
      ? `${text.substring(
          0,
          MAX_REDDIT_POST_LENGTH - 100
        )}...\n\n Cut off due to Reddit's post limits. Full post [here](https://flixbox.github.io/lp-compat${updateFilePath})`
      : text;

  console.log(redditPostText);

  // Automatically creating a stickied thread for a moderated subreddit
  r.getSubreddit("luckypatcher")
    .submitSelfpost({
      title: `App compatibility updates - Week ${dateString}`,
      text: redditPostText,
    })
    .sticky()
    .distinguish()
    .approve()
    .assignFlair({ text: "✨ Weekly Update", css_class: "weekly-thread" })
    .reply(
      "You can discuss the updates here. For the most recent version, head to the [list](https://flixbox.github.io/lp-compat/). If you know any other compatible or incompatible apps, feel free to post them here as well!"
    );
};

main();
