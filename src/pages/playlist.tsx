import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/hooks/reduxHooks';

export default function Playlist() {
	const user = useAppSelector(state => state.user.value);
	const likedTracks = useAppSelector(state => state.likedTracks.value);
	const { isDarkTheme } = useTheme();
	if (!user?.email) {
		return null;
	}

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<h1>Playlist</h1>
			<p>Signed in as {user?.email}</p>
			<div>
				<ul>
					{likedTracks.map(track => (
						<li key={track.name}>{track.name}</li>
					))}
				</ul>
			</div>
		</PageLayout>
	);
}

Playlist.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
