import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

interface SystemState {
  appsListUpdated: number;
  appsListPage: number;
}

const initialState = {
  appsListUpdated: Date.now(),
  appsListPage: 0,
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
  },
});

export const { setAppsListUpdated, setAppsListPage } = systemSlice.actions;
export default systemSlice.reducer;
