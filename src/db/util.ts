const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;

export const executeAppsQuery = async (operation: Function) => {
  const client = new MongoClient(uri);
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
