import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appsReducer from "./appsSlice";
import systemReducer from "./systemSlice";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist-indexeddb-storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "lp_compat_persist_key",
  storage: storage("lp_compat_persist_db"),
  stateReconciler: autoMergeLevel2
};

const stateToSave = {
  namespace: "flixbox",
  states: [
    "apps",
    "system.appsListPage",
    "system.appsListUpdated",
    "system.dialogs",
  ],
};

const configs = { throttleTime: 500, deleteCount: 2 };

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      apps: appsReducer,
      system: systemReducer,
    })
  ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
