import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  appsListUpdated: number;
  appsListPage: number;
}

const initialState = {
  appsListUpdated: Date.now(),
  appsListPage: 0,
} as SystemState;

export const clearState = createAction("clear");

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAppsListUpdated(state, action: PayloadAction<number>) {
      state.appsListUpdated = action.payload;
    },
    setAppsListPage(state, action: PayloadAction<number>) {
      console.log("action.payload", action.payload);
      state.appsListPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState);
  },
});

export const { setAppsListUpdated, setAppsListPage } = systemSlice.actions;
export default systemSlice.reducer;
