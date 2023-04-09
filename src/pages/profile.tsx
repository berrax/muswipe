import React from 'react';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/hooks/reduxHooks';

export default function Profile() {
	const user = useAppSelector(state => state.user.value);
	const { isDarkTheme, toggleTheme } = useTheme();

	if (!user?.email) {
		return null;
	}
	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<h1>Perfil</h1>
			<p>Signed in as {user?.email}</p>

			<button onClick={() => signOut()}>Sign out</button>
			<p>Actual theme: {isDarkTheme ? 'dark' : 'light'}</p>
			<button onClick={toggleTheme}>Change Theme</button>
			<br />
		</PageLayout>
	);
}

Profile.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
