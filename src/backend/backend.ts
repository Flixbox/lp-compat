import express from "express";
import addApp from "../db/addApp";
import getApp from "../db/getApp";

const app = express();
const port = 5000;

async function run() {
  // for (const appId of Object.keys(apps)) {
  //   await addApp(apps[appId]);
  // }
}

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/apps/get/:appId", async (req, res) => {
  res.send(await getApp(req.params.appId));
});

app.post("/apps/add/", async (req, res) => {
  const app = req.body;
  res.send(await addApp(app));
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`);
});
