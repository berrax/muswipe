import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { ITransversal } from '@/interfaces/contentful.interface';
import { HandEmoji } from '@/assets/svg/hand';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { TrackList } from '@/components/organisms/track-list/track-list';
import { oneHourInMS } from '@/constants/globals';
import { Skeleton } from '@/components/molecules/skeleton/skeleton';
import styles from '@/styles/pages/swipe.module.scss';
import { SkeletonElement } from '@/components/atoms/skeleton/skeleton-element';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { initRecommendations } from '@/store/slices/recommendations.slice';

interface IProps {
	data: ITransversal;
}
const GLOBAL_PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF';
export default function Swipe({ data }: IProps) {
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user.value);
	const recommendations = useAppSelector(state => state.recommendations.value);
	const { isDarkTheme } = useTheme();

	const query = useQueryApi({
		queryKey: ['GlobalPlaylist'],
		service: () => SpotifyServices.getPlaylistByID(GLOBAL_PLAYLIST_ID),
		staleTime: oneHourInMS,
	});

	useEffect(() => {
		if (query.data && !recommendations) {
			dispatch(initRecommendations(query.data.tracks.items));
		}
	}, [query.data]);

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<Head>
				<title>Muswipe - match</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className={styles.pageContent}>
				<header className={styles.header}>
					<Image
						src={user?.image || data.imagenPrincipal?.url!}
						alt="profile picture"
						width={30}
						height={30}
						className={styles.profile_image}
					/>
					<h1 className={styles.header__title}>
						{data.tituloPrincipal} <HandEmoji />
						{user?.name ? `, ${user?.name}` : ''}
					</h1>
				</header>
				<main className={styles.main}>
					{recommendations ? (
						<TrackList recommendations={recommendations} />
					) : (
						<SkeletonSwipe />
					)}
				</main>
			</div>
		</PageLayout>
	);
}

Swipe.auth = {
	role: 'user',
	unauthorized: '/',
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data, status } = await ContentfulServices.getTransversal(
			'home-page',
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

const SkeletonSwipe = () => (
	<>
		<Skeleton className={styles.skeleton_tracks} />
		<Skeleton className={styles.skeleton_container}>
			<SkeletonElement isLight height="20px" style={{ marginTop: '10px' }} />
			<SkeletonElement
				isLight
				height="18px"
				width="70px"
				style={{ margin: '20px 0', borderRadius: '15px' }}
			/>
			<SkeletonElement isLight width="80%" />
			<SkeletonElement isLight width="80%" />
		</Skeleton>
		<Skeleton className={styles.skeleton_btn}>
			<SkeletonElement
				isLight
				width="60px"
				height="60px"
				style={{ margin: '0 20px', borderRadius: '30px' }}
			/>
			<SkeletonElement
				isLight
				width="60px"
				height="60px"
				style={{ margin: '0 20px', borderRadius: '30px' }}
			/>
		</Skeleton>
	</>
);
