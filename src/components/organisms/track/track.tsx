import React, { useState } from 'react';
import Image from 'next/image';
import { ItemTrack } from '@/interfaces/spotify.interface';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { oneHourInMS } from '@/constants/globals';
import { NoLike } from '@/assets/svg/no-like';
import { Like } from '@/assets/svg/like';
import styles from './track.module.scss';

interface IProps {
	_tracks: ItemTrack[];
}

export const Tracks = ({ _tracks }: IProps) => {
	const [tracks, setTracks] = useState(_tracks);

	const queryArtist = useQueryApi({
		queryKey: ['Artist', tracks[0].track.id],
		service: () => SpotifyServices.getArtistByID(tracks[0].track.artists[0].id),
		staleTime: oneHourInMS / 2,
		cacheTime: oneHourInMS / 2,
	});

	const handleLike = () => {
		setTracks(removeFirstItem(tracks));
	};
	const handleDisLike = () => {
		setTracks(removeFirstItem(tracks));
	};

	const removeFirstItem = (array: any) => {
		const copy = [...array];
		copy.shift();
		return copy;
	};

	return (
		<>
			<div className={styles.cards}>
				{tracks.slice(0, 3).map((track, index) => (
					<button
						style={{ zIndex: 3 - index }}
						className={styles.card}
						key={track.track.id}>
						<Image
							src={track.track.album.images[0].url}
							alt="profile picture"
							width={track.track.album.images[0].width}
							height={track.track.album.images[0].height}
							className={styles.card__image}
							priority
						/>
					</button>
				))}
				<div className={styles.status}>
					<div className={`${styles.status__icon} ${styles.status__nolike}`}>
						<NoLike />
					</div>
					<div className={`${styles.status__icon} ${styles.status__nolike}`}>
						<Like />
					</div>
				</div>
			</div>
			<div className={styles.info_wrapper}>
				<div className={styles.info_title_container}>
					<h3 className={styles.info_title}>{tracks[0].track.name}</h3>
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
					{tracks[0].track.artists[0].name}
				</span>
				<br />
				<span className={styles.info_subtitle}>Album</span>
				<span className={styles.info_text}>{tracks[0].track.album.name}</span>
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
