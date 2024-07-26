// const playstore = require("../../static/compat-data/playstore.json");

export default async (appId: string): Promise<any> => {
  const { app, search } = ((await import("google-play-scraper")) as any).default;

  let foundApp = null

  try {
    foundApp = await app({ appId });
  } catch(e) {
    foundApp = (await search({ term: appId, num: 1 }))[0]
  }

  console.info(`App ID ${appId} successfully retrieved! App:`);
  console.info(foundApp);

  if (!foundApp.installs) foundApp.installs = foundApp.minInstalls;
  if (!foundApp.scoreText && foundApp.score)
    foundApp.scoreText = String(foundApp.score.toFixed(1));

  return foundApp;
};
