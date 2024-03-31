// const playstore = require("../../static/compat-data/playstore.json");

export default async (appId: string): Promise<any> => {
  const { app } = await import("google-play-scraper");
  // if (playstore[appId]) return playstore[appId];
  return await app({ appId });
};
