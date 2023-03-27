import React from 'react';
import {
	color_purple,
	color_gray_light,
	color_light,
	color_dark,
} from '@/constants/globals';

interface IProps {
	active?: boolean;
	color?: string;
	isDark?: boolean;
}
export const HomeIcon = ({ color, active = false, isDark = false }: IProps) => {
	const activeColor = isDark ? color_light : color_purple;
	const inactiveColor = isDark ? color_dark : color_gray_light;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
			<path
				fill={color ? color : active ? activeColor : inactiveColor}
				d="M7.5 26.25a2.406 2.406 0 0 1-1.765-.734A2.408 2.408 0 0 1 5 23.75V12.5c0-.396.089-.77.266-1.125.177-.354.421-.646.734-.875l7.5-5.625c.23-.167.469-.292.719-.375.25-.083.51-.125.781-.125.27 0 .531.042.781.125.25.083.49.208.719.375L24 10.5a2.487 2.487 0 0 1 1 2v11.25a2.41 2.41 0 0 1-.734 1.766 2.41 2.41 0 0 1-1.766.734h-5V17.5h-5v8.75h-5Z"
			/>
		</svg>
	);
};
