import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { likedTracksSlice } from './slices/liked-tracks-slice';
import { recommendationsSlice } from './slices/recommendations.slice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		likedTracks: likedTracksSlice.reducer,
		recommendations: recommendationsSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
