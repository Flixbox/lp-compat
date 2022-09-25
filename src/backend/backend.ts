import express from "express";
const helmet = require("helmet");

import cors from "cors";
import addApp from "../db/addApp";
import getAllAppIds from "../db/getAllAppIds";
import getAllApps from "../db/getAllApps";
import getApp from "../db/getApp";
import swaggerUi from "swagger-ui-express";
import session from "cookie-session";
import getAppsByPage from "../db/getAppsByPage";
import getAppCount from "../db/getAppCount";
import generatedDocs from "../../swagger-output.json";
import { getDiscord } from "../discord/util";

const app = express();
const port = +process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(generatedDocs, { explorer: true })
// );
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(
  session({
    name: "session",
  })
);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/discord/get/:code", async (req, res) => {
  console.log("req.params.code", req.params.code);
  res.send(await getDiscord(req.params.code, req));
});

app.get("/apps/count", async (req, res) => {
  res.send(await getAppCount());
});

app.get("/apps/get/:appId", async (req, res) => {
  res.send(await getApp(req.params.appId));
});

app.get("/apps/all", async (req, res) => {
  const allApps = await getAllApps();
  console.log(JSON.stringify(allApps).length);
  res.send(allApps);
});

app.get("/apps/page/:page/:pagesize", async (req, res) => {
  const apps = await getAppsByPage(+req.params.page, +req.params.pagesize);
  res.send(apps);
});

app.get("/apps/all/ids", async (req, res) => {
  const allApps = await getAllAppIds();
  console.log(JSON.stringify(allApps).length);
  res.send(allApps);
});

app.post("/apps/add/", async (req, res) => {
  /*  #swagger.parameters['app'] = {
                in: 'body',
                description: 'App information.',
                required: true,
                schema: { $ref: "#/definitions/AppCompatData" }
      } 
  */
  const app = req.body;
  res.send(await addApp(app, res));
});

app.listen(port, hostname, () => {
  console.log(`Express listening on port ${hostname}:${port}!`);
});
