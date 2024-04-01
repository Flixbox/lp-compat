// const playstore = require("../../static/compat-data/playstore.json");

export default async (appId: string): Promise<any> => {
  const { app } = ((await import("google-play-scraper")) as any).default;

  const foundApp = await app({ appId });
  console.info(`App ID ${appId} successfully retrieved! App:`);
  console.info(foundApp);

  if (!foundApp.installs) foundApp.installs = foundApp.minInstalls;
  if (!foundApp.scoreText)
    foundApp.scoreText = String(foundApp.score.toFixed(1));

  return foundApp;
};
