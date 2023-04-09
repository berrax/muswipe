import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ITrack } from '@/interfaces/globals.interface';

interface LikedTracksState {
	value: ITrack[];
}
const initialState: LikedTracksState = {
	value: [],
};

export const likedTracksSlice = createSlice({
	name: 'likedTracks',
	initialState,
	reducers: {
		dislikeTrack: (state, action: PayloadAction<number>) => {
			state.value.splice(action.payload, 1);
		},
		likeTrack: (state, action: PayloadAction<ITrack>) => {
			state.value.unshift(action.payload);
		},
		setInitialLikedTracks: (state, action: PayloadAction<ITrack[]>) => {
			state.value = action.payload;
		},
		resetLikedTracks: state => {
			state.value = [];
		},
	},
});

export const {
	dislikeTrack,
	likeTrack,
	setInitialLikedTracks,
	resetLikedTracks,
} = likedTracksSlice.actions;
