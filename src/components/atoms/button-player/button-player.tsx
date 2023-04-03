import React from 'react';
import styles from './button-player.module.scss';
import { usePlayer } from '@/hooks/usePlayer';
interface IProps {
	audio: string;
}

export const ButtonPlayer = ({ audio }: IProps) => {
	const { togglePlayer, isReproducing } = usePlayer();

	return (
		<button
			onClick={() => togglePlayer(audio)}
			className={`${styles.btn_player} ${
				isReproducing ? styles.isReproducing : ''
			}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</button>
	);
};
