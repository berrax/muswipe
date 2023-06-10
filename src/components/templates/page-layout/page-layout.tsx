import React from 'react';
import { MobileMenu } from '@/components/molecules/mobile-menu/mobile-menu';
import { IPropsChildren } from '@/interfaces/globals.interface';
import styles from './page-layout.module.scss';

interface IProps extends IPropsChildren {
	isDarkTheme?: boolean;
	isGradientBG?: boolean;
}

export const PageLayout = ({
	children,
	isDarkTheme = false,
	isGradientBG = false,
}: IProps) => {
	const classNames = [styles.wrapper];
	if (isGradientBG) classNames[1] = styles.gradient;

	return (
		<div className={classNames.join(' ')}>
			{children}
			<MobileMenu isDark={isDarkTheme} />
		</div>
	);
};
