import gplay from "google-play-scraper";
import { writeFileSync } from "fs";
import apps from "../static/compat-data/apps.json";
// import playstore from "../static/compat-data/playstore.json";

const fetchData = async () => {
  const playstore = {};

  for (const appId in apps) {
    // console.log(`${app}: ${apps[app]}`);
    try {
      const result = await gplay.app({ appId });
      playstore[appId] = result;
      await new Promise((f) => setTimeout(f, 300));
    } catch (e) {
      console.error("App not found: ", appId);
      console.error(e);
    }
  }

  // console.log(playstore);
  writeFileSync(
    "./static/compat-data/playstore.json",
    JSON.stringify(playstore)
  );
};

fetchData();
