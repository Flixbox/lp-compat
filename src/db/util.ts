const { MongoClient } = require("mongodb");

export const MONGO_URI = process.env.MONGO_URL;

const executeGenericQuery = async (
  operation: Function,
  db: string,
  collection: string
) => {
  const run = async () => {
    const client = new MongoClient(MONGO_URI);
    const database = client.db(db);
    const collectionObject = database.collection(collection);

    let result;
    try {
      result = await operation(collectionObject);
    } catch (e) {
      throw e;
    } finally {
      await client.close();
    }
    return result;
  };

  return await run().catch((e) => {
    console.dir(e);
    throw e;
  });
};

export const executeAppsQuery = async (operation: Function) =>
  executeGenericQuery(operation, "test", "apps");

export const executeStaffQuery = async (operation: Function) =>
  executeGenericQuery(operation, "guild", "staff");

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
