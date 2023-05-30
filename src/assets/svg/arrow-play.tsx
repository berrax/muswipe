import { color_light, color_gray_light } from '../../constants/globals';

export const ArrowPlay = () => {
	return (
		<svg width="13" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.366 13.8a1 1 0 0 1-1.732 0L1.737 7.05a1 1 0 0 1 .866-1.5h7.794a1 1 0 0 1 .866 1.5L7.366 13.8Z"
				fill={color_light}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.768 14.3.87 7.55c-.77-1.334.192-3 1.732-3h7.794c1.54 0 2.502 1.666 1.732 3L8.232 14.3c-.77 1.333-2.694 1.333-3.464 0Zm.866-.5a1 1 0 0 0 1.732 0l3.897-6.75a1 1 0 0 0-.866-1.5H2.603a1 1 0 0 0-.866 1.5l3.897 6.75Z"
				fill={color_gray_light}
			/>
			<path
				d="M1.95 2.3a.65.65 0 1 1 0-1.3h9.1a.65.65 0 1 1 0 1.3h-9.1Z"
				fill={color_light}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.95 0h9.1a1.65 1.65 0 1 1 0 3.3h-9.1a1.65 1.65 0 1 1 0-3.3ZM1.3 1.65c0 .359.291.65.65.65h9.1a.65.65 0 1 0 0-1.3h-9.1a.65.65 0 0 0-.65.65Z"
				fill={color_gray_light}
			/>
		</svg>
	);
};
