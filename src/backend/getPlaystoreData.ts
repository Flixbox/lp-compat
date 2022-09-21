const gplay = require("google-play-scraper");

export default async (appId) => {
  return await gplay.app({ appId });
};
