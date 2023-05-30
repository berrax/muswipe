import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ITransversal } from '@/interfaces/contentful.interface';
import { useTheme } from '../hooks/useTheme';
import Head from 'next/head';
import { Sun, Moon } from '@/assets/svg/toggle-theme-icons';
import styles from '@/styles/pages/index.module.scss';
import Image from 'next/image';
import { ArrowPlay } from '@/assets/svg/arrow-play';
import { Swiper } from '@/components/organisms/swiper/swiper';

const ToggleButton = dynamic(
	() =>
		import('@/components/atoms/toggle-button/toggle-button').then(
			e => e.ToggleButton,
		),
	{
		ssr: false,
	},
);

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data, status } = await ContentfulServices.getTransversal(
			'login-page',
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

export default function Component({ data }: IProps) {
	const router = useRouter();
	const session = useSession();
	const { isDarkTheme, toggleTheme } = useTheme();

	const carouselData = data.subPaginaCollection!.items[0];
	const footerData = data.subPaginaCollection!.items[1];

	useEffect(() => {
		if (session.status === 'authenticated') {
			router.push('/swipe');
		}
	}, [session.status]);

	if (!session) return null;

	return (
		<>
			<Head>
				<title>Muswipe - login to start</title>
			</Head>
			<div className={styles.center}>
				<h1 className={styles.title}>{data.tituloPrincipal}</h1>
				<div className={styles.container_image}>
					<Image
						src={data.imagenPrincipal?.url!}
						alt="principal image"
						width={350}
						height={350}
						priority
					/>
				</div>
				<h2 className={styles.second_title}>{data.tituloSecundario}</h2>
				<p className={styles.info_text}>{data.descripcionPrincipal}</p>

				<button
					className={styles.btn_principal}
					onClick={() => signIn('spotify')}>
					{data.accionPrincipal}
				</button>

				<div className={styles.scroll}>
					<span>{data.otro}</span>
					<div className={styles.scroll_arrows}>
						<ArrowPlay />
						<ArrowPlay />
						<ArrowPlay />
					</div>
				</div>

				<div className={styles.banner}>
					<Image
						src={data.imagenesCollection?.items[0].url!}
						alt="headphones image"
						width={80}
						height={80}
						className={styles.banner_img}
					/>
					<p>{data.descripcionSecundaria}</p>
					<div className={styles.banner_inner}></div>
				</div>

				<Swiper
					content={[
						{
							image: carouselData.imagenesCollection!.items[0].url!,
							text: carouselData.descripcion!,
						},
						{
							image: carouselData.imagenesCollection!.items[1].url!,
							text: carouselData.titulo!,
						},
						{
							image: carouselData.imagenesCollection!.items[2].url!,
							text: carouselData.subtitulo!,
						},
					]}
				/>

				<div className={styles.follow_us}>
					<span>{footerData.titulo}</span>
					<Image
						src={footerData.imagenesCollection?.items[3].url!}
						alt="tiktok logo"
						width={24}
						height={24}
					/>
					<Image
						src={footerData.imagenesCollection?.items[4].url!}
						alt="instagram logo"
						width={24}
						height={24}
					/>
					<Image
						src={footerData.imagenesCollection?.items[5].url!}
						alt="twitter logo"
						width={24}
						height={24}
					/>
					<Image
						src={footerData.imagenesCollection?.items[6].url!}
						alt="twitter logo"
						width={300}
						height={220}
						className={styles.img_music_notes}
					/>
				</div>
				<div className={styles.footer_waves}></div>
				<footer className={styles.footer}>
					<div className={styles.footer_sectionOne}>
						<div className={styles.footer_appstores}>
							<span>{footerData.subtitulo}</span>
							<Image
								src={footerData.imagenesCollection?.items[1].url!}
								alt="app store logo"
								width={30}
								height={30}
							/>
							<Image
								src={footerData.imagenesCollection?.items[2].url!}
								alt="google store logo"
								width={30}
								height={30}
							/>
						</div>
						<div className={styles.footer_toggle}>
							<ToggleButton
								action={toggleTheme}
								init={!isDarkTheme}
								offImg={<Sun />}
								onImg={<Moon />}
							/>
						</div>
					</div>
					<div className={styles.footer_sectionTwo}>
						<span>{footerData.descripcion}</span>
						<ul>
							{footerData.otro?.split('&&').map((elem, index) => (
								<li key={index}>{elem}</li>
							))}
						</ul>
						<span className={styles.cr}>{footerData.accionSecundaria}</span>
					</div>
				</footer>
			</div>
		</>
	);
}
