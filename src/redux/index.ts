import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appsReducer from "./appsSlice";
import systemReducer from "./systemSlice";

const configs = { throttleTime: 500, deleteCount: 2 };

export const store = configureStore({
  reducer: combineReducers({
    apps: appsReducer,
    system: systemReducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
