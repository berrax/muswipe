import { GetStaticProps } from 'next';
import Image from 'next/image';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { useAuth } from '@/hooks/useAuth';
import { PageLayout } from '@/components/templates/page-layout/page-layout';
import { useTheme } from '@/hooks/useTheme';
import { ITransversal } from '@/interfaces/contentful.interface';
import styles from '@/styles/pages/swipe.module.scss';
import { HandEmoji } from '@/assets/svg/hand';
interface IProps {
	data: ITransversal;
}

export default function Swipe({ data }: IProps) {
	const user = useAuth();
	const { isDarkTheme } = useTheme();

	return (
		<PageLayout isDarkTheme={isDarkTheme}>
			<div className={styles.header}>
				<Image
					src={user?.image || data.imagenPrincipal?.url!}
					alt="profile picture"
					width={30}
					height={30}
					className={styles.profile_image}
				/>
				<h2 className={styles.header__title}>
					{data.tituloPrincipal} <HandEmoji />,{'  '}
					{user?.name}
				</h2>
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
