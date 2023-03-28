import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { IPropsChildren, ITheme } from '@/interfaces/globals.interface';

export const ThemeContext = createContext<ITheme>(null as any);

export const ThemeProvider = ({ children }: IPropsChildren) => {
	const theme = useProviderTheme();
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);

function useProviderTheme() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = useCallback(() => {
		setIsDarkTheme(isDark => {
			if (isDark) window.localStorage.setItem('IS_DARK_THEME', 'false');
			else window.localStorage.setItem('IS_DARK_THEME', 'true');
			return !isDark;
		});
	}, []);

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

	return { isDarkTheme, toggleTheme };
}
