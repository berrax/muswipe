import React, { useState } from 'react';
import { ItemTrack } from '@/interfaces/spotify.interface';
import { useQueryApi } from '@/hooks/useQueryApi';
import useTimeout from '@/hooks/useTimeOut';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { oneHourInMS } from '@/constants/globals';
import { SwipeTracks } from '@/components/molecules/swipe-tracks/swipe-tracks';
import { Skeleton } from '@/components/molecules/skeleton/skeleton';
import { SkeletonElement } from '@/components/atoms/skeleton/skeleton-element';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { likeTrack } from '@/store/slices/liked-tracks-slice';
import { nextRecommendation } from '@/store/slices/recommendations.slice';
import { addToDiscovered } from '@/store/slices/user-slice';
import { Like, NoLike } from '@/assets/svg/like-icons';
import styles from './track-list.module.scss';

interface IProps {
	recommendations: ItemTrack[];
}

export const TrackList = ({ recommendations }: IProps) => {
	const dispatch = useAppDispatch();

	const [transform, setTransform] = useState<string | null>(null);
	const { timeOut, clearTimeOut } = useTimeout();

	const moveOutWidth =
		typeof window !== 'undefined' ? document.body.clientWidth * 1.5 : 0;

	const queryArtist = useQueryApi({
		queryKey: ['Artist', recommendations[0].track.id],
		service: () =>
			SpotifyServices.getArtistByID(recommendations[0].track.artists[0].id),
		staleTime: oneHourInMS / 2,
		cacheTime: oneHourInMS / 2,
	});

	const handleLike = async () => {
		setTransform(`translate(${moveOutWidth}px, -100px) rotate(-30deg)`);
		await timeOut(320);
		setTransform(null);
		next(true);
		clearTimeOut();
	};

	const handleDisLike = async () => {
		setTransform(`translate(-${moveOutWidth}px, -100px) rotate(30deg)`);
		await timeOut(320);
		setTransform(null);
		4;
		next(false);
		clearTimeOut();
	};

	const next = (isLike: boolean) => {
		if (isLike) {
			const likedTrack = recommendations[0].track;
			dispatch(
				likeTrack({
					name: likedTrack.name,
					artists: likedTrack.artists.map(artist => artist.name),
					audio: likedTrack.preview_url,
					id: likedTrack.id,
					image: likedTrack.album.images[0].url,
					duration_ms: likedTrack.duration_ms,
				}),
			);
		}
		dispatch(addToDiscovered());
		dispatch(nextRecommendation());
	};

	return (
		<>
			<SwipeTracks tracks={recommendations} transform={transform} />
			<section className={styles.info_wrapper}>
				<div className={styles.info_title_container}>
					<h3 className={styles.info_title}>{recommendations[0].track.name}</h3>
					<time className={styles.date}>
						{recommendations[0].track.album.release_date.slice(0, 4)}
					</time>
				</div>
				{queryArtist.data ? (
					<div className={styles.genres_container}>
						{queryArtist.data.genres.map(genre => (
							<span key={genre} className={styles.genre}>
								{genre}
							</span>
						))}
					</div>
				) : (
					<Skeleton>
						<SkeletonElement
							isLight
							height="18px"
							width="70px"
							style={{
								marginTop: '2px',
								marginBottom: '10px',
								borderRadius: '15px',
							}}
						/>
					</Skeleton>
				)}
				<strong className={styles.info_subtitle}>Artist</strong>
				<span className={styles.info_text}>
					{recommendations[0].track.artists[0].name}
				</span>
				<br />
				<strong className={styles.info_subtitle}>Album</strong>
				<span className={styles.info_text}>
					{recommendations[0].track.album.name}
				</span>
				<div className={styles.buttons_wrapper}>
					<button onClick={handleDisLike} className={styles.button}>
						<NoLike />
					</button>
					<button
						onClick={handleLike}
						className={`${styles.button} ${
							50 - 2 < recommendations.length ? styles.button_wiggle : null
						}`}>
						<Like />
					</button>
				</div>
			</section>
		</>
	);
};
