import gplay from "google-play-scraper";
import { writeFileSync } from "fs";
import { SingleBar, Presets } from "cli-progress";
import apps from "../static/compat-data/apps.json";
const oldPlayStoreData = require("../static/compat-data/playstore.json");

const fetchData = async () => {
  const playstore = {};
  const appsLength = Object.keys(apps).length;

  const bar = new SingleBar({}, Presets.shades_classic);
  console.log(
    `Checking ${appsLength} apps and downloading play store info if necessary...`
  );
  bar.start(appsLength, 0);

  for (const appId in apps) {
    try {
      if (oldPlayStoreData[appId] && oldPlayStoreData[appId].title) {
        playstore[appId] = oldPlayStoreData[appId];
      } else {
        const result = await gplay.app({ appId });
        playstore[appId] = result;
        await new Promise((f) => setTimeout(f, 300));
      }
    } catch (e) {
      console.error("App not found: ", appId);
      console.error(e);
    }
    bar.increment();
  }

  writeFileSync(
    "./static/compat-data/playstore.json",
    JSON.stringify(playstore, null, 4)
  );

  bar.stop();
  console.log(`Done!`);
};

fetchData();
