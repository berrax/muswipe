import React from 'react';
import Image from 'next/image';
import { ItemTrack } from '@/interfaces/spotify.interface';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { oneHourInMS } from '@/constants/globals';
import { NoLike } from '@/assets/svg/no-like';
import { Like } from '@/assets/svg/like';
import styles from './track.module.scss';

interface IProps {
	tracks: ItemTrack[];
}

export const Tracks = ({ tracks }: IProps) => {
	const firstTrack = tracks[0].track;
	const queryArtist = useQueryApi({
		queryKey: ['Artist', firstTrack.id],
		service: () => SpotifyServices.getArtistByID(firstTrack.artists[0].id),
		staleTime: oneHourInMS,
		cacheTime: 5000 * 60,
	});

	return (
		<>
			<div className={styles.image_wrapper}>
				<Image
					src={firstTrack.album.images[0].url}
					alt="profile picture"
					width={firstTrack.album.images[0].width}
					height={firstTrack.album.images[0].height}
					className={styles.image}
					priority
				/>
			</div>
			<div className={styles.info_wrapper}>
				<div className={styles.info_title_container}>
					<h3 className={styles.info_title}>{firstTrack.name}</h3>
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
				<span className={styles.info_text}>{firstTrack.artists[0].name}</span>
				<br />
				<span className={styles.info_subtitle}>Album</span>
				<span className={styles.info_text}>{firstTrack.album.name}</span>
			</div>
			<div className={styles.buttons_wrapper}>
				<button className={styles.button}>
					<NoLike />
				</button>
				<button className={styles.button}>
					<Like />
				</button>
			</div>
		</>
	);
};
