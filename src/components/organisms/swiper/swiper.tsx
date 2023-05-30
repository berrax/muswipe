import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper as SwiperJs, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './swiper.module.scss';

interface IContentSwipe {
	image: string;
	text: string;
}

interface IProps {
	content: IContentSwipe[];
}

export const Swiper = ({ content }: IProps) => {
	const [activeIndex, setActiveIndex] = useState(1);
	return (
		<div className={styles.container}>
			<SwiperJs
				onActiveIndexChange={i => setActiveIndex(i.activeIndex)}
				className={`mySwiper ${styles.swiper}`}
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				initialSlide={1}>
				{content.map((elem, i) => (
					<SwiperSlide key={i} className={styles.swiper_slide}>
						<Image
							src={elem.image}
							alt="image"
							width={300}
							height={300}
							priority
						/>
					</SwiperSlide>
				))}
			</SwiperJs>
			<div className={styles.container_text}>
				<p className={styles.text}>{content[activeIndex].text}</p>
			</div>
		</div>
	);
};
