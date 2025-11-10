import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appsSlice } from '@/redux/appsSlice'
import { systemSlice } from '@/redux/systemSlice'

export const store = configureStore({
  reducer: combineReducers({
    apps: appsSlice.reducer,
    system: systemSlice.reducer,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
