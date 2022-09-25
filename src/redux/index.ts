import { configureStore } from "@reduxjs/toolkit";
import appsReducer from "./appsSlice";
import systemReducer from "./systemSlice";
import { save, load } from "redux-localstorage-simple";

const stateToSave = {
  namespace: "flixbox",
  states: [
    "apps",
    "system.appsListPage",
    "system.appsListUpdated",
    "system.dialogs",
  ],
};

export const store = configureStore({
  reducer: {
    apps: appsReducer,
    system: systemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save(stateToSave)),
  preloadedState: load(stateToSave),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
