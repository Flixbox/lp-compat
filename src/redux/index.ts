import { configureStore } from "@reduxjs/toolkit";
import appsReducer from "./appsSlice";
import { save, load } from "redux-localstorage-simple";

export const store = configureStore({
  reducer: {
    apps: appsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
  preloadedState: load(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
