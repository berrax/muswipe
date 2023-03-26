import { ReactNode } from 'react';

export interface IUser {
	name?: string;
	email?: string;
	status: string;
}

export interface IAuth {
	user: IUser | undefined;
	isDarkTheme: boolean;
	toggleTheme: () => void;
}

export interface IPropsChildren {
	children: ReactNode;
}
