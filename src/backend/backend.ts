import express from "express";
const helmet = require("helmet");
import addApp from "../db/addApp";
import getAllApps from "../db/getAllApps";
import getApp from "../db/getApp";
const apps = require("../../static/compat-data/apps.json");

const app = express();
const port = +process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";

app.use(helmet());
app.use(express.json());

(async () => {
  // for (const appId of Object.keys(apps)) {
  //   await addApp({ appId, ...apps[appId] });
  //   console.log("added " + appId);
  // }
})();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/apps/get/:appId", async (req, res) => {
  res.send(await getApp(req.params.appId));
});

app.get("/apps/all", async (req, res) => {
  const allApps = await getAllApps();
  console.log(JSON.stringify(allApps).length);
  res.send(allApps);
});

app.post("/apps/add/", async (req, res) => {
  const app = req.body;
  res.send(await addApp(app));
});

app.listen(port, hostname, () => {
  console.log(`Express listening on port ${hostname}:${port}!`);
});
