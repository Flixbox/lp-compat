const { MongoClient } = require("mongodb");

export const MONGO_URI = process.env.MONGO_URL;

console.log("MONGO_URI", MONGO_URI);

export const executeAppsQuery = async (operation: Function) => {
  console.log("executeAppsQuery");
  let result;
  let client;
  try {
    client = new MongoClient(MONGO_URI, { monitorCommands: true });

    client.on("commandStarted", (event) => console.debug(event));
    client.on("commandSucceeded", (event) => console.debug(event));
    client.on("commandFailed", (event) => console.debug(event));

    const database = client.db("test");
    const appsCollection = database.collection("apps");
    result = await operation(appsCollection);
  } catch (e) {
    console.log("Error during mongodb operation on apps", e);
  } finally {
    await client.close();
  }
  return result;
};

export const appProjection = {
  appId: 1,
  features: 1,
  dateModified: 1,
  title: 1,
  icon: 1,
  installs: 1,
  scoreText: 1,
  url: 1,
  genre: 1,
  screenshots: 1,
  free: 1,
  priceText: 1,
  editedBy: 1,
};

export const getUserDetails = (userName, userId) => ({
  editedBy: {
    userName,
    userId,
  },
});
