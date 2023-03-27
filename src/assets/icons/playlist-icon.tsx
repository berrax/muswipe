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
export const PlaylistIcon = ({
	color,
	active = false,
	isDark = false,
}: IProps) => {
	const activeColor = isDark ? color_light : color_purple;
	const inactiveColor = isDark ? color_dark : color_gray_light;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
			<path
				fill={color ? color : active ? activeColor : inactiveColor}
				d="M3.281 7.5a1.406 1.406 0 0 1 1.406-1.406h20.625a1.406 1.406 0 0 1 0 2.812H4.688A1.406 1.406 0 0 1 3.282 7.5Zm1.406 8.906h13.594a1.406 1.406 0 1 0 0-2.812H4.688a1.406 1.406 0 0 0 0 2.812Zm7.97 4.688h-7.97a1.406 1.406 0 0 0 0 2.812h7.97a1.406 1.406 0 1 0 0-2.812Zm16.815-6.159a1.406 1.406 0 0 1-1.751.938l-2.877-.858V22.5a4.219 4.219 0 1 1-2.813-3.977v-5.398a1.406 1.406 0 0 1 1.81-1.347l4.688 1.407a1.406 1.406 0 0 1 .942 1.75Zm-7.44 7.565a1.407 1.407 0 1 0-2.814 0 1.407 1.407 0 0 0 2.813 0Z"
			/>
		</svg>
	);
};
