import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { activeProfileSlice } from './activeProfile';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activeProfile: activeProfileSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
