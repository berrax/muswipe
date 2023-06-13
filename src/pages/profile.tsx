import React from 'react';
import Image from 'next/image';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { ToggleButton } from '@/components/atoms/toggle-button/toggle-button';
import { Sun, Moon } from '@/assets/svg/toggle-theme-icons';
import styles from '@/styles/pages/profile.module.scss';
import { ITransversal } from '@/interfaces/contentful.interface';
import { GetStaticProps } from 'next';
import { ContentfulServices } from '@/services/contentful/contentful.services';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data, status } = await ContentfulServices.getTransversal(
			'profile-page',
		);
		return {
			props: { data: status === 200 ? data.data.pageCollection.items[0] : {} },
		};
	} catch (error) {
		console.log('getStaticProps Error: ', error);
		return {
			props: { data: {} },
		};
	}
};

interface IProps {
	data: ITransversal;
}

export default function Profile({ data }: IProps) {
	const user = useAppSelector(state => state.user.value);
	const { isDarkTheme, toggleTheme } = useTheme();

	const options = data.otro!.split('%');

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<div className={styles.wrapper}>
				<Image
					alt="profile image"
					src={user.image || data.imagenPrincipal?.url!}
					width={100}
					height={100}
					className={styles.profile_img}
				/>

				<h1>{user.name}</h1>
				<span>@{user.username}</span>
				<ul className={styles.list}>
					{options.map((elem, i) => (
						<li>
							<span className={styles.list_one}>{i}</span>
							<span className={styles.list_two}>{elem}</span>
						</li>
					))}
				</ul>
				<div className={styles.container_darkmode}>
					<span>{data.tituloPrincipal}</span>
					<ToggleButton
						action={toggleTheme}
						init={!isDarkTheme}
						offImg={<Sun />}
						onImg={<Moon />}
					/>
				</div>
				<button onClick={() => signOut()} className={styles.logout}>
					Sign out
				</button>
			</div>
		</PageLayout>
	);
}

Profile.auth = {
	role: 'user',
	loading: <h1>Loading...</h1>,
	unauthorized: '/',
};
