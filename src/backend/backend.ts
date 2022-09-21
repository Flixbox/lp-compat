import { MongoClient } from "mongodb";
import apps from "../../static/compat-data/apps.json";
const playstore = require("../../static/compat-data/playstore.json");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("test");
    const appsCollection = database.collection("apps");
    for (const appId of Object.keys(apps)) {
      await appsCollection.insertOne({
        appId,
        ...apps[appId],
        ...playstore[appId],
      });
      console.info(`added ${appId}`);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
