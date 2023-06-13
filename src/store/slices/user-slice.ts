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
	},
});

export const { setUser, resetUser } = userSlice.actions;
