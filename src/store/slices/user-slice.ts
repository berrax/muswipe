import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IUser } from '@/interfaces/auth.interface';

interface IUserState {
	value: IUser;
}
const initialState: IUserState = {
	value: {} as IUser,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.value = action.payload;
		},
		resetUser: state => {
			state.value = initialState.value;
		},
		addToDiscovered: state => {
			const discovered = state.value.discoverd || 0;
			state.value = { ...state.value, discoverd: discovered + 1 };
		},
	},
});

export const { setUser, resetUser, addToDiscovered } = userSlice.actions;
