import { color_purple, color_light } from '../../constants/globals';
export const Like = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" fill="none">
			<g filter="url(#a)">
				<circle cx="30" cy="30" r="30" fill={color_purple} />
			</g>
			<g clipPath="url(#b)">
				<path
					fill={color_light}
					d="M29.85 19.586c.378.318.928.318 1.305 0 1.668-1.4 3.711-2.922 5.805-2.866 2.375.063 4.636.994 6.316 2.603 1.679 1.607 2.652 3.768 2.72 6.04.068 2.273-.774 4.483-2.354 6.18l-12.45 11.936a1 1 0 0 1-1.385 0L17.36 31.543c-1.582-1.697-2.425-3.91-2.356-6.184.069-2.274 1.044-4.437 2.726-6.044 1.682-1.607 3.942-2.536 6.317-2.598 2.094-.054 4.136 1.468 5.803 2.87Z"
				/>
			</g>
			<defs>
				<clipPath id="b">
					<path fill={color_light} d="M15 15h31v30H15z" />
				</clipPath>
				<filter
					id="a"
					width="63"
					height="63"
					x="0"
					y="0"
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset dx="2" dy="2" />
					<feGaussianBlur stdDeviation=".5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix values="0 0 0 0 0.447059 0 0 0 0 0.282353 0 0 0 0 0.933333 0 0 0 0.2 0" />
					<feBlend
						in2="BackgroundImageFix"
						result="effect1_dropShadow_132_559"
					/>
					<feBlend
						in="SourceGraphic"
						in2="effect1_dropShadow_132_559"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};
