import { createContext, useContext, useState, useEffect } from 'react';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { useSession } from 'next-auth/react';
import { IPropsChildren } from '@/interfaces/globals.interface';
import { IAuth, IUser } from '@/interfaces/auth.interface';

export const AuthContext = createContext<IAuth>(null as any);

export const AuthProvider = ({ children }: IPropsChildren) => {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProviderAuth() {
	const session = useSession();
	const [user, setUser] = useState<IUser>({ status: session.status });

	useEffect(() => {
		if (session.status === 'authenticated') {
			getUserInfo()
				.then(resp => {
					if (resp) {
						setUser({
							email: resp?.email,
							name: resp?.display_name,
							status: 'authenticated',
						});
					}
				})
				.catch(() => setUser({ status: 'error' }));
		} else {
			setUser({ status: session.status });
		}
	}, [session]);

	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const toggleTheme = () => {
		setIsDarkTheme(isDark => {
			if (isDark) window.localStorage.setItem('IS_DARK_THEME', 'false');
			else window.localStorage.setItem('IS_DARK_THEME', 'true');
			return !isDark;
		});
	};

	useEffect(() => {
		if (isDarkTheme) {
			document.documentElement.dataset.theme = 'dark';
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}, [isDarkTheme]);

	useEffect(() => {
		const isDarkThemeLS = window.localStorage.getItem('IS_DARK_THEME');
		if (isDarkThemeLS) {
			setIsDarkTheme(isDarkThemeLS === 'true');
		} else {
			const prefersDarkTheme = window.matchMedia(
				'(prefers-color-scheme: dark)',
			).matches;
			setIsDarkTheme(prefersDarkTheme);
		}
	}, []);

	return { user, isDarkTheme, toggleTheme };
}

const getUserInfo = async () => {
	try {
		const response = await SpotifyServices.getUserInfo();
		if (response?.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log('UseAuth getUserInfo error: ', error);
	}
};
