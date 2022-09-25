import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import axiosInstance from "./axios";
import { clearState, setAppsListPage } from "./systemSlice";
import { App } from "../types";

export const pageSize = 50;

export const fetchApps = createAsyncThunk(
  "apps/all",
  async () => (await axiosInstance.get("/apps/all")).data
);

export const fetchApp = createAsyncThunk<any, { appId: string }>(
  "apps/get",
  async ({ appId }) => (await axiosInstance.get(`apps/get/${appId}`)).data
);

export const fetchAppsByPage = createAsyncThunk<any, { page: number }>(
  "apps/page",
  async ({ page }, thunkAPI) => {
    const data = (await axiosInstance.get(`apps/page/${page}/${pageSize}`))
      .data;
    thunkAPI.dispatch(setAppsListPage(page + 1));
    return data;
  }
);

export const fetchAppCount = createAsyncThunk(
  "apps/count",
  async () => (await axiosInstance.get(`apps/count`)).data
);

export const addApp = createAsyncThunk<any, { app: App }>(
  "apps/add",
  async ({ app }) => (await axiosInstance.post(`apps/add/`, app)).data
);

export const editApp = createAsyncThunk<any, { app: App }>(
  "apps/edit",
  async ({ app }) => (await axiosInstance.post(`apps/edit/`, app)).data
);

export const getPlayStoreData = createAsyncThunk<any, { appId: string }>(
  "playstore/get",
  async ({ appId }) => (await axiosInstance.get(`/playstore/get/${appId}`)).data
);

export const searchPlayStoreData = createAsyncThunk<any, { query: string }>(
  "playstore/search",
  async ({ query }) =>
    (await axiosInstance.get(`/playstore/search/${query}`)).data
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
        (app) => action.payload.value.appId === app.appId
      );
      if (index < 0) state.push(action.payload.value);
      state[index] = action.payload.value;
    });
    builder.addCase(editApp.fulfilled, (state, action) => {
      console.log("editApp result", action.payload);
      const index = state.findIndex(
        (app) => action.payload.value.appId === app.appId
      );
      if (index < 0) state.push(action.payload.value);
      state[index] = action.payload.value;
    });
    builder.addCase(fetchAppsByPage.fulfilled, (state, action) => {
      action.payload.forEach(
        (app) =>
          app._id === "632c280dabd31def75d1ac54" && console.log("Found app!")
      );
      return [...state, ...action.payload];
    });
  },
});

export default appsSlice.reducer;
