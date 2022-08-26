import gplay from "google-play-scraper";
import { writeFileSync } from "fs";
import apps from "../static/compat-data/apps.json";
// import playstore from "../static/compat-data/playstore.json";

const fetchData = async () => {
  const playstore = {};

  gplay
    .app({ appId: "com.google.android.apps.translate" })
    .then(console.log, console.log);

  for (const appId in apps) {
    // console.log(`${app}: ${apps[app]}`);
    const result = await gplay.app({ appId });
    playstore[appId] = result;
  }

  console.log(playstore);
  writeFileSync(
    "./static/compat-data/playstore.json",
    JSON.stringify(playstore)
  );
};

fetchData();
