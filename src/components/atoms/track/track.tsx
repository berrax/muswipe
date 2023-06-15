import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ITrack } from '@/interfaces/spotify.interface';
import Hammer from 'hammerjs';
import { ButtonPlayer } from '../button-player/button-player';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { nextRecommendation } from '@/store/slices/recommendations.slice';
import styles from './track.module.scss';
import { likeTrack } from '@/store/slices/liked-tracks-slice';
import { addToDiscovered } from '@/store/slices/user-slice';

interface IStatus {
	isMoving: boolean;
	isLove?: boolean;
}

const handlePan = (
	elem: HTMLDivElement,
	setIsMoving: (value: boolean) => void,
	next: (isLike: boolean) => void,
	setStatus: (value: IStatus) => void,
) => {
	const hammer = new Hammer(elem);
	hammer.on('pan', event => {
		setIsMoving(true);
		if (event.deltaX === 0) return;
		if (event.center.x === 0 && event.center.y === 0) return;

		if (event.deltaX > 0) {
			setStatus({ isMoving: true, isLove: true });
		} else {
			setStatus({ isMoving: true, isLove: false });
		}

		var xMulti = event.deltaX * 0.03;
		var yMulti = event.deltaY / 80;
		var rotate = xMulti * yMulti;

		event.target.style.transform =
			'translate(' +
			event.deltaX +
			'px, ' +
			event.deltaY +
			'px) rotate(' +
			rotate +
			'deg)';
	});

	hammer.on('panend', event => {
		setIsMoving(false);
		setStatus({ isMoving: false });

		var moveOutWidth = document.body.clientWidth;
		var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

		if (keep) {
			event.target.style.transform = '';
		} else {
			var endX = Math.max(
				Math.abs(event.velocityX) * moveOutWidth,
				moveOutWidth,
			);
			var toX = event.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.velocityY) * moveOutWidth;
			var toY = event.deltaY > 0 ? endY : -endY;
			var xMulti = event.deltaX * 0.03;
			var yMulti = event.deltaY / 80;
			var rotate = xMulti * yMulti;

			event.target.style.transform =
				'translate(' +
				toX +
				'px, ' +
				(toY + event.deltaY) +
				'px) rotate(' +
				rotate +
				'deg)';
			next(toX > 0);
		}
	});
};

interface IProps {
	track: ITrack;
	style?: React.CSSProperties;
	setStatus: (value: IStatus) => void;
	transform: string | null;
	isFirst: boolean;
}

export const Track = ({
	track,
	style,
	setStatus,
	transform,
	isFirst,
}: IProps) => {
	const dispatch = useAppDispatch();
	const ref = useRef<any>(null);
	const [isMoving, setIsMoving] = useState(false);

	const next = (isLike: boolean) => {
		if (isLike) {
			dispatch(
				likeTrack({
					name: track.name,
					artists: track.artists.map(artist => artist.name),
					audio: track.preview_url,
					id: track.id,
					image: track.album.images[0].url,
					duration_ms: track.duration_ms,
				}),
			);
		}
		dispatch(addToDiscovered());
		dispatch(nextRecommendation());
	};

	useEffect(() => {
		if (ref.current) {
			handlePan(ref.current, setIsMoving, next, setStatus);
		}
		return () => {
			ref.current = null;
		};
	}, []);

	return (
		<figure
			ref={ref}
			style={{ ...style, transform: transform ? transform : style?.transform }}
			className={`${isMoving ? styles.moving : null} ${styles.card}`}>
			{isFirst && (
				<div className={styles.player_container}>
					<ButtonPlayer audio={track.preview_url} />
				</div>
			)}
			<Image
				src={track.album.images[0].url}
				alt="song album picture"
				width={track.album.images[0].width}
				height={track.album.images[0].height}
				className={styles.card__image}
				priority
			/>
		</figure>
	);
};
