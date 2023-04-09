import { ReactNode } from 'react';
export interface IPropsChildren {
	children: ReactNode;
}

export interface ITheme {
	isDarkTheme: boolean;
	toggleTheme: () => void;
}

export interface ITrack {
	id: string;
	name: string;
	artists: string[];
	image: string;
	audio: string;
}
