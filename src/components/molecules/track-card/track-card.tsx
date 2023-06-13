import React from 'react';
import Image from 'next/image';
import { ITrack } from '@/interfaces/globals.interface';
import styles from './track-card.module.scss';
import { formatTime } from '@/utils/globals-utils';
import { FavIcon } from '@/assets/svg/fav-icon';
import { PlayPauseBtn } from '@/components/atoms/play-pause-button/play-pause-button';

interface IProps {
	track: ITrack;
	index: number;
	isDark: boolean;
	handleFav: (id: string) => void;
}

export const TrackCard = ({ track, index, isDark, handleFav }: IProps) => {
	const { name, duration_ms, artists, image, audio, id } = track;

	return (
		<li className={`${styles.track_item} ${isDark && styles.bg_dark}`}>
			<span className={styles.index}>{index < 10 ? '0' + index : index}</span>
			<div className={styles.image_container}>
				<Image
					src={image}
					alt="cover image"
					width={46}
					height={46}
					className={styles.cover_img}
				/>
				<PlayPauseBtn audio={audio} />
			</div>
			<div className={styles.container}>
				<span className={styles.name}>{name}</span>
				<span className={`${styles.artist} ${isDark && styles.artist_dark}`}>
					{artists[0]}
				</span>
			</div>
			<div className={styles.time_container}>
				<span className={styles.time}>{formatTime(duration_ms)}</span>
				<button className={styles.icon_container} onClick={() => handleFav(id)}>
					<FavIcon />
				</button>
			</div>
		</li>
	);
};
