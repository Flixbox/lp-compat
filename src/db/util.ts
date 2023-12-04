const { MongoClient } = require("mongodb");

export const MONGO_URI = `${process.env.MONGO_URL}?retryWrites=true&w=majority`;

console.log("MONGO_URI", MONGO_URI);

export const executeAppsQuery = async (operation: Function) => {
  const run = async () => {
    const client = new MongoClient(MONGO_URI);
    const database = client.db("test");
    const appsCollection = database.collection("apps");

    let result;
    try {
      result = await operation(appsCollection);
    } finally {
      await client.close();
    }
    return result;
  };

  run().catch(console.dir);
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
