import { IAppItemFullDetail, app } from "google-play-scraper";
// const playstore = require("../../static/compat-data/playstore.json");

export default async (appId: string): Promise<IAppItemFullDetail> => {
  // if (playstore[appId]) return playstore[appId];
  return await app({ appId });
};
