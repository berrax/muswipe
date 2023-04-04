import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { useAuth } from '@/hooks/useAuth';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { ITransversal } from '@/interfaces/contentful.interface';
import { ItemTrack } from '@/interfaces/spotify.interface';
import { HandEmoji } from '@/assets/svg/hand';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { TrackList } from '@/components/organisms/track-list/track-list';
import { oneHourInMS } from '@/constants/globals';
import { Skeleton } from '@/components/molecules/skeleton/skeleton';
import styles from '@/styles/pages/swipe.module.scss';
import { SkeletonElement } from '@/components/atoms/skeleton/skeleton-element';

interface IProps {
	data: ITransversal;
}
const GLOBAL_PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF';
export default function Swipe({ data }: IProps) {
	const user = useAuth();
	const { isDarkTheme } = useTheme();

	const query = useQueryApi({
		queryKey: ['GlobalPlaylist'],
		service: () => SpotifyServices.getPlaylistByID(GLOBAL_PLAYLIST_ID),
		staleTime: oneHourInMS,
	});

	let tracks: ItemTrack[] = [];
	if (query.data) {
		tracks = query.data.tracks.items;
	}

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<Head>
				<title>Muswipe - match</title>
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
					<h2 className={styles.header__title}>
						{data.tituloPrincipal} <HandEmoji />
						{user?.name ? `, ${user?.name}` : ''}
					</h2>
				</header>
				<main className={styles.main}>
					{query.data ? (
						<TrackList tracks={tracks} />
					) : (
						<>
							<Skeleton className={styles.skeleton_tracks} />
							<Skeleton className={styles.skeleton_container}>
								<SkeletonElement
									isLight
									height="20px"
									style={{ marginTop: '10px' }}
								/>
								<SkeletonElement
									isLight
									height="18px"
									width="70px"
									style={{ margin: '20px 0', borderRadius: '15px' }}
								/>
								<SkeletonElement isLight width="80%" />
								<SkeletonElement isLight width="80%" />
							</Skeleton>
						</>
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
