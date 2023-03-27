import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon } from '@/assets/icons/home-icon';
import { PlaylistIcon } from '../../../assets/icons/playlist-icon';
import { ProfileIcon } from '@/assets/icons/profile-icon';
import styles from './mobile-menu.module.scss';

interface IProps {
	isDark?: boolean;
}

export const MobileMenu = ({ isDark = false }: IProps) => {
	const router = useRouter();
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div
					className={`${styles.background} ${
						isDark ? styles.background_dark : styles.background_light
					}`}></div>
				<div className={styles.icons}>
					<ul>
						<li>
							<Link href="/swipe" className={styles.link}>
								<HomeIcon
									active={router.pathname === '/swipe'}
									isDark={isDark}
								/>
							</Link>
						</li>
						<li>
							<Link href="/playlist" className={styles.link}>
								<PlaylistIcon
									active={router.pathname === '/playlist'}
									isDark={isDark}
								/>
							</Link>
						</li>
						<li>
							<Link href="/profile" className={styles.link}>
								<ProfileIcon
									active={router.pathname === '/profile'}
									isDark={isDark}
								/>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
