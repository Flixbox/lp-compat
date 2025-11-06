import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import axiosInstance from "./axios";
import { clearState, setAppsListPage } from "./systemSlice";
import { App } from "../types";
import { DiscordUser } from "../hooks/useDiscord";
import { SCRAPER_BASE } from "../backend/getPlaystoreData.js";

export const pageSize = 5000;

// All apps-related requests should go via the worker URL below.
export const APPS_WORKER_URL = "https://lp-compat-backend.alone-king-poking.workers.dev";

// Lazy-load apps from the static JSON shipped with the site instead of the backend.
// The file is expected to be available at /lp-compat/lucky-patcher-app-compatibility.json
const STATIC_APPS_URL = "/lp-compat/lucky-patcher-app-compatibility.json";

export const fetchApps = createAsyncThunk(
  "apps/all",
  async () => {
    const response = await fetch(`${APPS_WORKER_URL}/read`);
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`);
    return (await response.json()) as App[];
  }
);

export const fetchApp = createAsyncThunk<any, { appId: string }>(
  "apps/get",
  async ({ appId }) => {
    const response = await fetch(`${APPS_WORKER_URL}/read`);
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`);
    const data = (await response.json()) as App[];
    return data.find((a) => a.appId === appId);
  }
);

export const fetchAppsByPage = createAsyncThunk<any, { page: number }>(
  "apps/page",
  async ({ page }, thunkAPI) => {
    const response = await fetch(`${APPS_WORKER_URL}/read`);
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`);
    const data = (await response.json()) as App[];
    const start = page * pageSize;
    const pageSlice = data.slice(start, start + pageSize);
    thunkAPI.dispatch(setAppsListPage(page + 1));
    return pageSlice;
  }
);

export const fetchAppCount = createAsyncThunk(
  "apps/count",
  async () => {
    const response = await fetch(`${APPS_WORKER_URL}/read`);
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`);
    const data = (await response.json()) as App[];
    return data.length;
  }
);

export const addApp = createAsyncThunk<
  any,
  { app: App; discordUser: DiscordUser }
>(
  "apps/add",
  async ({ app, discordUser }) => {
    // The worker expects the App object and discordUser in the request body at /create.
    const res = await fetch(`${APPS_WORKER_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app, discordUser }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to add app via worker: ${res.status} ${text}`);
    }
    return await res.json();
  }
);

export const editApp = createAsyncThunk<
  any,
  { app: App; discordUser: DiscordUser }
>(
  "apps/edit",
  async ({ app, discordUser }) => {
    // The worker expects the App object and discordUser in the request body at /update.
    const res = await fetch(`${APPS_WORKER_URL}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app, discordUser }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to edit app via worker: ${res.status} ${text}`);
    }
    return await res.json();
  }
);

export const getPlayStoreData = createAsyncThunk<any, { appId: string }>(
  "playstore/get",
  async ({ appId }) => {
    const res = await fetch(`${SCRAPER_BASE}/app`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ appId }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch playstore data from scraper: ${res.status} ${text}`);
    }
    return await res.json();
  }
);

export const searchPlayStoreData = createAsyncThunk<any, { query: string }>(
  "playstore/search",
  async ({ query }) => {
    const res = await fetch(`${SCRAPER_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ term: query, num: 10 }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to search playstore data from scraper: ${res.status} ${text}`);
    }
    return await res.json();
  }
);

// Define the initial state using that type
const initialState: App[] = [];

export const appsSlice = createSlice({
  name: "apps",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState);
    builder.addCase(fetchApps.fulfilled, (state, action) => action.payload);
    builder.addCase(fetchApp.fulfilled, (state, action) => {
      const index = state.findIndex(
        (app) => action.payload.appId === app.appId
      );
      if (index < 0) state.push(action.payload);
      state[index] = action.payload;
    });
    builder.addCase(addApp.fulfilled, (state, action) => {
      console.log("addapp result", action.payload);
      const index = state.findIndex(
        (app) => action.payload.appId === app.appId
      );
      if (index < 0) state.push(action.payload);
      state[index] = action.payload;
    });
    builder.addCase(editApp.fulfilled, (state, action) => {
      console.log("editApp result", action.payload);
      const index = state.findIndex(
        (app) => action.payload.appId === app.appId
      );
      if (index < 0) state.push(action.payload);
      state[index] = action.payload;
    });
    builder.addCase(fetchAppsByPage.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
  },
});

export default appsSlice.reducer;
