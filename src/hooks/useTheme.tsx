import { createContext, useContext, useState, useCallback } from 'react';
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
	const [isDarkTheme, setIsDarkTheme] = useState(initIsDarkTheme());

	const toggleTheme = useCallback(() => {
		setIsDarkTheme(isDark => {
			if (isDark) window.localStorage.setItem('IS_DARK_THEME', 'false');
			else window.localStorage.setItem('IS_DARK_THEME', 'true');
			handleChangeDark(!isDark);
			return !isDark;
		});
	}, []);

	return { isDarkTheme, toggleTheme };
}

function handleChangeDark(isDark: boolean) {
	if (isDark) {
		document.documentElement.dataset.theme = 'dark';
	} else {
		document.documentElement.dataset.theme = 'light';
	}
}

function initIsDarkTheme() {
	if (typeof window === 'undefined') return false;

	const IS_DARK_THEME_LS = localStorage.getItem('IS_DARK_THEME');
	if (IS_DARK_THEME_LS) {
		const isDarkTheme = IS_DARK_THEME_LS === 'true';
		handleChangeDark(isDarkTheme);
		return isDarkTheme;
	}

	const prefersDarkTheme = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;
	handleChangeDark(prefersDarkTheme);
	return prefersDarkTheme;
}
