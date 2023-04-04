import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import styles from './player.module.scss';

export default function Player() {
	const audio = useRef<HTMLAudioElement>(null);
	const { audioUrl, reproduce, initElement, isReproducing } = usePlayer();
	const [progressBar, setProgressBarr] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		if (audio.current) {
			initElement(audio.current);
		}
	}, []);

	const handleLoad = (e: any) => {
		setDuration(e.target.duration);
	};
	const handleProgressBar = (e: any) => {
		if (duration !== 0) {
			setProgressBarr(Math.round((100 * e.target.currentTime) / duration));
		}
	};

	useEffect(() => {
		if (isReproducing) {
			audio.current?.load();
			audio.current?.play();
		}
	}, [audioUrl]);

	return (
		<>
			{isReproducing && (
				<progress className={styles.progress_bar}>
					<div
						style={{ width: progressBar + '%' }}
						className={styles.progress_bar__content}></div>
				</progress>
			)}
			<audio
				ref={audio}
				onPlay={() => reproduce(true)}
				onPause={() => reproduce(false)}
				onTimeUpdate={handleProgressBar}
				onLoadedData={handleLoad}>
				<source src={audioUrl} type="audio/mpeg" />
			</audio>
		</>
	);
}
