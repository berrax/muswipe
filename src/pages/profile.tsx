import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from 'next-auth/react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
	const user = useAuth();
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
		</PageLayout>
	);
}

Profile.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
