import React from 'react';
import { MobileMenu } from '@/components/molecules/mobile-menu/mobile-menu';
import { IPropsChildren } from '@/interfaces/globals.interface';
import styles from './page-layout.module.scss';

interface IProps extends IPropsChildren {
	isDarkTheme?: boolean;
}

export const PageLayout = ({ children, isDarkTheme = false }: IProps) => {
	return (
		<div className={styles.wrapper}>
			{children}
			<MobileMenu isDark={isDarkTheme} />
		</div>
	);
};
