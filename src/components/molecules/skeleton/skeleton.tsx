import React from 'react';
import { SkeletonShimmer } from '@/components/atoms/skeleton/skeleton-shimmer/skeleton-shimmer';
import { IPropsChildren } from '@/interfaces/globals.interface';
import styles from './skeleton.module.scss';

interface IProps extends Partial<IPropsChildren> {
	className?: string;
}

export const Skeleton = ({ children, className }: IProps) => {
	return (
		<div className={`${styles.skeleton_wrapper} ${className}`}>
			{children}
			<SkeletonShimmer />
		</div>
	);
};
