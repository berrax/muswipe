import React from 'react';
import styles from './skeleton-shimmer.module.scss';

export const SkeletonShimmer = () => {
	return (
		<div className={styles.shimmer_wrapper}>
			<div className={styles.shimmer}></div>
		</div>
	);
};
