import React from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import styles from './play-pause-button.module.scss';

interface IProps {
	audio: string;
}

export const PlayPauseBtn = ({ audio }: IProps) => {
	const { togglePlayer, isReproducing, audioUrl, element } = usePlayer();

	const handleClick = () => {
		if (element) {
			togglePlayer(audio);
		}
	};

	return (
		<button
			className={`${styles.play_icon} ${
				isReproducing && audio === audioUrl && styles.play_icon__pause
			}`}
			onClick={handleClick}></button>
	);
};
