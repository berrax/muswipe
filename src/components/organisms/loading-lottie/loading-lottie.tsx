import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import LoadingAnimation from '@/assets/animation/bouncy-loading.json';
import styles from './loading-lottie.module.scss';

export const LoadingLottie = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Lottie
					animationData={LoadingAnimation}
					loop={true}
					autoPlay={true}
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
		</div>
	);
};
