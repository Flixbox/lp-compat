const gplay = require("google-play-scraper");
const playstore = require("../../static/compat-data/playstore.json");

export default async (appId) => {
  if (playstore[appId]) return playstore[appId];
  return await gplay.app({ appId });
};
