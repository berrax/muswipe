import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

export default function Playlist() {
	const user = useAuth();
	const { isDarkTheme } = useTheme();
	if (!user?.email) {
		return null;
	}

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<h1>Playlist</h1>
			<p>Signed in as {user?.email}</p>
		</PageLayout>
	);
}

Playlist.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
