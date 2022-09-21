const playstore = require("../../static/compat-data/playstore.json");
const gplay = require("google-play-scraper");

export default async (appId) => {
  let playstoreData = playstore[app.appId];
  if (playstoreData) return playstoreData;
  return await gplay.app({ appId });
};
