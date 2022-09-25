import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

interface DiscordUser {
  MFAEnabled: boolean;
  avatar: string;
  discriminator: string;
  email: null;
  flags: number;
  id: string;
  locale: string;
  tag: string;
  username: string;
}

interface SystemState {
  appsListUpdated: number;
  appsListPage: number;
  discordUser?: DiscordUser;
}

const initialState = {
  appsListUpdated: Date.now(),
  appsListPage: 0,
  discordUser: undefined,
} as SystemState;

export const clearState = createAction("clear");

export const fetchDiscord = createAsyncThunk<any, { code: string }>(
  "/discord/get",
  async ({ code }) => (await axiosInstance.get(`discord/get/${code}`)).data
);

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAppsListUpdated(state, action: PayloadAction<number>) {
      state.appsListUpdated = action.payload;
    },
    setAppsListPage(state, action: PayloadAction<number>) {
      state.appsListPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState);
    builder.addCase(fetchDiscord.fulfilled, (state, action) => {
      console.log("got to reducer with ", action.payload);
      state.discordUser = action.payload;
    });
  },
});

export const { setAppsListUpdated, setAppsListPage } = systemSlice.actions;
export default systemSlice.reducer;
