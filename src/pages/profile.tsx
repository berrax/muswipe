import React from 'react';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { ToggleButton } from '@/components/atoms/toggle-button/toggle-button';
import { Sun, Moon } from '@/assets/svg/toggle-theme-icons';

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
			<br />
			<br />
			<br />
			<ToggleButton
				action={toggleTheme}
				init={!isDarkTheme}
				offImg={<Sun />}
				onImg={<Moon />}
			/>
		</PageLayout>
	);
}

Profile.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
