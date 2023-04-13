import React, { useEffect, useRef, useState } from 'react';
import { ItemTrack } from '@/interfaces/spotify.interface';
import dynamic from 'next/dynamic';
import { usePlayer } from '@/hooks/usePlayer';
import { Like, NoLike } from '@/assets/svg/like-icons';
import styles from './swipe-tracks.module.scss';

const Track = dynamic(
	() => import('../../atoms/track/track').then(e => e.Track),
	{
		ssr: false,
	},
);

interface IStatus {
	isMoving: boolean;
	isLove?: boolean;
}

interface IProps {
	tracks: ItemTrack[];

	transform: string | null;
}

export const SwipeTracks = ({ tracks, transform }: IProps) => {
	const [status, setStatus] = useState<IStatus>({
		isMoving: false,
		isLove: false,
	});
	const cardsRef = useRef<HTMLDivElement>(null);
	const { isReproducing, setTrack } = usePlayer();

	useEffect(() => {
		if (isReproducing) {
			setTrack(tracks[0].track.preview_url);
		}
	}, [tracks.length]);

	return (
		<section className={styles.cards} ref={cardsRef}>
			{tracks.slice(0, 3).map((track, index) => (
				<Track
					track={track.track}
					key={track.track.id}
					style={{
						zIndex: tracks.length - index,
						transform: `scale(${(20 - index) / 20}) translateY(-${
							20 * index
						}px)`,
						opacity: (10 - index) / 10,
					}}
					setStatus={setStatus}
					transform={index === 0 ? transform : null}
					isFirst={index === 0}
				/>
			))}
			<div className={styles.status}>
				<div
					className={`${styles.status__icon} ${
						status.isMoving && !status.isLove ? styles.isMoving : ''
					}`}>
					<NoLike />
				</div>
				<div
					className={`${styles.status__icon} ${
						status.isMoving && status.isLove ? styles.isMoving : ''
					}`}>
					<Like />
				</div>
			</div>
		</section>
	);
};
