/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: { ignoreBuildErrors: true },
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'i.scdn.co' },
			{ protocol: 'https', hostname: 'images.ctfassets.net' },
		],
	},
};

module.exports = nextConfig;
