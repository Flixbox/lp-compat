import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import { App } from "../types";

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

interface Dialogs {
  EDIT_APP: { open: boolean; appId?: App["appId"] };
}

interface SystemState {
  appsListUpdated: number;
  appsListPage: number;
  discordUser?: DiscordUser;
  discordGuilds?: [];
  dialogs: Dialogs;
}

const initialState = {
  appsListUpdated: Date.now(),
  appsListPage: 0,
  discordUser: undefined,
  discordGuilds: [],
  dialogs: {
    EDIT_APP: { open: false },
  },
} as SystemState;

export const clearState = createAction("clear");

export const fetchDiscord = createAsyncThunk<any, { code: string }>(
  "/discord/get",
  async ({ code }) => {
    const res = await axiosInstance.get(`discord/get/${code}`);
    return res.data;
  }
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
    openDialog(
      state,
      action: PayloadAction<{ dialog: keyof Dialogs; data: any }>
    ) {
      state.dialogs[action.payload.dialog] = {
        open: true,
        ...action.payload.data,
      };
    },
    closeDialog(state, action: PayloadAction<{ dialog: keyof Dialogs }>) {
      state.dialogs[action.payload.dialog] = {
        open: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState);
    builder.addCase(fetchDiscord.fulfilled, (state, action) => {
      state.discordUser = action.payload.discordUser;
      state.discordGuilds = action.payload.discordGuilds;
    });
  },
});

export const { setAppsListUpdated, setAppsListPage, openDialog, closeDialog } = systemSlice.actions;
export default systemSlice.reducer;
