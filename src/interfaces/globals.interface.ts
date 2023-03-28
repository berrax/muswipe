import { ReactNode } from 'react';
export interface IPropsChildren {
	children: ReactNode;
}

export interface ITheme {
	isDarkTheme: boolean;
	toggleTheme: () => void;
}
