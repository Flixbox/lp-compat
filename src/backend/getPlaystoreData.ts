const { app } = require("google-play-scraper");
// const playstore = require("../../static/compat-data/playstore.json");

export default async (appId: string): Promise<any> => {
  // if (playstore[appId]) return playstore[appId];
  return await app({ appId });
};
