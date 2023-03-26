import { useEffect, useState } from 'react';

export default function useDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.dataset.theme = 'dark';
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}, [isDarkMode]);

	useEffect(() => {
		const prefersDarkMode = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		setIsDarkMode(prefersDarkMode);
	}, []);

	return [isDarkMode, setIsDarkMode];
}
