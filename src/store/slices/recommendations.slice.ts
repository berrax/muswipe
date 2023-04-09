import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ItemTrack } from '@/interfaces/spotify.interface';
import { removeFirstItem } from '@/utils/tracks';

interface IRecommendationsState {
	value: ItemTrack[] | null;
}
const initialState: IRecommendationsState = {
	value: null,
};

export const recommendationsSlice = createSlice({
	name: 'recommendations',
	initialState,
	reducers: {
		initRecommendations: (state, action: PayloadAction<ItemTrack[]>) => {
			state.value = action.payload;
		},
		nextRecommendation: state => {
			state.value = state.value ? removeFirstItem(state.value) : null;
		},
	},
});

export const { initRecommendations, nextRecommendation } =
	recommendationsSlice.actions;
