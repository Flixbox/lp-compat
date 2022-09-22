import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import axiosInstance from "./axios";

export const fetchApps = createAsyncThunk(
  "apps/all",
  async () => (await axiosInstance.get("/apps/all")).data
);

export interface App {
  appId: string;
  features: string[];
  dateModified: number;
  title: string;
  summary: string;
  installs: string;
  minInstalls: number;
  price: number;
  free: boolean;
  scoreText: string;
  priceText: string;
  androidVersion: number;
  androidVersionText: string;
  developer: string;
  developerId: string;
  genre: string;
  genreId: string;
  icon: string;
  headerImage: string;
  screenshots: string[];
  adSupported: boolean;
  updated: number;
  version: string;
  recentChanges: string;
  url: string;
}

// Define the initial state using that type
const initialState: App[] = [];

export const appsSlice = createSlice({
  name: "apps",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApps.fulfilled, (state, action) => action.payload);
  },
});

export default appsSlice.reducer;
