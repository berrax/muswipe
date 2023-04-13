import React, { useState } from 'react';
import styles from './toggle-button.module.scss';

interface IProps {
	action: () => void;
	init?: boolean;
	onImg?: JSX.Element;
	offImg?: JSX.Element;
}

export const ToggleButton = ({
	action,
	init = false,
	onImg,
	offImg,
}: IProps) => {
	const [isOn, setIsOn] = useState(init);
	const handleClick = () => {
		action();
		setIsOn(value => !value);
	};
	return (
		<button
			onClick={handleClick}
			className={`${styles.wrapper} ${isOn ? styles.on : styles.off}`}>
			{offImg && (
				<div className={`${styles.img} ${styles.off_img}`}>{offImg}</div>
			)}
			{onImg && <div className={`${styles.img} ${styles.on_img}`}>{onImg}</div>}
			<div className={styles.toggle}></div>
		</button>
	);
};
