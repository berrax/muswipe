import React, { useState } from 'react';
import { ItemTrack } from '@/interfaces/spotify.interface';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { oneHourInMS } from '@/constants/globals';
import { NoLike } from '@/assets/svg/no-like';
import { Like } from '@/assets/svg/like';
import { SwipeTracks } from '@/components/molecules/swipe-tracks/swipe-tracks';
import { removeFirstItem } from '@/utils/tracks';
import styles from './track-list.module.scss';
import useTimeout from '@/hooks/useTimeOut';

interface IProps {
	tracks: ItemTrack[];
}

export const TrackList = ({ tracks }: IProps) => {
	const [copyTracks, setCopyTracks] = useState(tracks);
	const [transform, setTransform] = useState<string | null>(null);
	const { timeOut, clearTimeOut } = useTimeout();

	const moveOutWidth =
		typeof window !== 'undefined' ? document.body.clientWidth * 1.5 : 0;

	const queryArtist = useQueryApi({
		queryKey: ['Artist', copyTracks[0].track.id],
		service: () =>
			SpotifyServices.getArtistByID(copyTracks[0].track.artists[0].id),
		staleTime: oneHourInMS / 2,
		cacheTime: oneHourInMS / 2,
	});

	const handleLike = async () => {
		setTransform(`translate(${moveOutWidth}px, -100px) rotate(-30deg)`);
		await timeOut(320);
		setTransform(null);
		next();
		clearTimeOut();
	};

	const handleDisLike = async () => {
		setTransform(`translate(-${moveOutWidth}px, -100px) rotate(30deg)`);
		await timeOut(320);
		setTransform(null);
		next();
		clearTimeOut();
	};

	const next = () => {
		setCopyTracks(actualTracks => removeFirstItem(actualTracks));
	};

	return (
		<>
			<SwipeTracks tracks={copyTracks} next={next} transform={transform} />
			<div className={styles.info_wrapper}>
				<div className={styles.info_title_container}>
					<h3 className={styles.info_title}>{copyTracks[0].track.name}</h3>
					<span className={styles.date}>2022</span>
				</div>
				{queryArtist.data && (
					<div className={styles.genres_container}>
						{queryArtist.data.genres.map(genre => (
							<span key={genre} className={styles.genre}>
								{genre}
							</span>
						))}
					</div>
				)}
				<span className={styles.info_subtitle}>Artist</span>
				<span className={styles.info_text}>
					{copyTracks[0].track.artists[0].name}
				</span>
				<br />
				<span className={styles.info_subtitle}>Album</span>
				<span className={styles.info_text}>
					{copyTracks[0].track.album.name}
				</span>
				<div className={styles.buttons_wrapper}>
					<button onClick={handleDisLike} className={styles.button}>
						<NoLike />
					</button>
					<button onClick={handleLike} className={styles.button}>
						<Like />
					</button>
				</div>
			</div>
		</>
	);
};
