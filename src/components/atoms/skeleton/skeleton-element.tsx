import React from 'react';
import styles from './skeleton-element.module.scss';
import {
	color_purple_skeleton,
	color_purple_skeleton_light,
} from '@/constants/globals';

interface IProps {
	isLight?: boolean;
	width?: string;
	height?: string;
	style?: React.CSSProperties;
}

export const SkeletonElement = ({
	isLight = false,
	width = '65%',
	height = '16px',
	style,
}: IProps) => {
	return (
		<div
			style={{
				...style,
				backgroundColor: isLight
					? color_purple_skeleton
					: color_purple_skeleton_light,
				width,
				height,
			}}
			className={styles.skeleton}></div>
	);
};
