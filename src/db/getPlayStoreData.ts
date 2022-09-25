import { Response } from "express";
import { App } from "../types";
import { executeAppsQuery } from "./util";

const getPlaystoreData = require("../backend/getPlaystoreData").default;

export default async (appId: App["appId"], res?: Response) => {
  console.log(appId);
  return await executeAppsQuery(async (appsCollection) => {
    const playStoreData = await getPlaystoreData(appId);
    return playStoreData;
  });
};
