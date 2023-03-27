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
