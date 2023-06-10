import Image from 'next/image';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/hooks/reduxHooks';
import styles from '../styles/pages/playlist.module.scss';

export default function Playlist() {
	const user = useAppSelector(state => state.user.value);
	const likedTracks = useAppSelector(state => state.likedTracks.value);
	const { isDarkTheme } = useTheme();
	if (!user?.email) {
		return null;
	}

	return (
		<PageLayout isDarkTheme={isDarkTheme} isGradientBG>
			<div className={styles.header}>
				<h1>Tus Canciones </h1>
				<Image
					src={require('@/assets/img/fire-heart.png')}
					alt="hear icon"
					width={35}
					height={35}
				/>
			</div>

			<ul className={styles.track_list}>
				{likedTracks.map(track => (
					<li key={track.name}>{track.name}</li>
				))}
			</ul>
		</PageLayout>
	);
}

Playlist.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
