import { useEffect, useState } from 'react';

export default function useDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggle = () => {
		setIsDarkMode(isDark => !isDark);
	};

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.dataset.theme = 'dark';
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}, [isDarkMode]);

	useEffect(() => {
		//mirar si esta en LS
		//code
		const prefersDarkMode = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		setIsDarkMode(prefersDarkMode);
	}, []);

	return { isDarkMode, toggle };
}
