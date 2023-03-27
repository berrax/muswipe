import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useAuth } from '../hooks/useAuth';

export default function Component() {
	const { isDarkTheme, user } = useAuth();
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
