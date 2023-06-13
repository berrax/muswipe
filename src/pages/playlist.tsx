import Image from 'next/image';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import styles from '../styles/pages/playlist.module.scss';
import { TrackCard } from '@/components/molecules/track-card/track-card';
import { dislikeTrack } from '@/store/slices/liked-tracks-slice';

export default function Playlist() {
	const user = useAppSelector(state => state.user.value);
	const likedTracks = useAppSelector(state => state.likedTracks.value);
	const { isDarkTheme } = useTheme();
	if (!user?.email) {
		return null;
	}
	const dispatch = useAppDispatch();
	const handleFav = (id: string) => {
		const index = likedTracks.findIndex(elem => elem.id === id);
		if (index >= 0) {
			dispatch(dislikeTrack(index));
		}
	};

	return (
		<PageLayout isDarkTheme={isDarkTheme} isGradientBG>
			<div className={styles.header}>
				<h1>Tus Canciones </h1>
				<Image
					src={require('@/assets/img/fire-heart.png')}
					alt="hear icon"
					width={30}
					height={30}
				/>
			</div>

			<ul className={styles.track_list}>
				{likedTracks.map((track, index) => (
					<TrackCard
						isDark={isDarkTheme}
						track={track}
						key={index + track.name}
						index={index + 1}
						handleFav={handleFav}
					/>
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
