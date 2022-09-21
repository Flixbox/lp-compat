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
