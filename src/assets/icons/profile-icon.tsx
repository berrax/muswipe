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
export const ProfileIcon = ({
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
				d="M12.219 15c-.75 0-1.375-.281-1.875-.844-.5-.562-.698-1.219-.594-1.969l.406-3.062a4.598 4.598 0 0 1 1.625-2.952C12.698 5.39 13.771 5 15 5c1.23 0 2.302.39 3.219 1.173a4.598 4.598 0 0 1 1.625 2.952l.406 3.063c.104.75-.094 1.406-.594 1.968-.5.563-1.125.844-1.875.844H12.22ZM7.5 25a2.407 2.407 0 0 1-1.765-.734A2.408 2.408 0 0 1 5 22.5v-1c0-.708.183-1.36.548-1.954A3.642 3.642 0 0 1 7 18.188a18.583 18.583 0 0 1 3.938-1.454A17.22 17.22 0 0 1 15 16.25c1.375 0 2.73.161 4.063.484 1.333.323 2.645.808 3.937 1.453a3.642 3.642 0 0 1 1.453 1.36c.364.593.547 1.245.547 1.953v1a2.41 2.41 0 0 1-.734 1.766A2.41 2.41 0 0 1 22.5 25h-15Z"
			/>
		</svg>
	);
};
