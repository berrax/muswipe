import SpotifyProvider from 'next-auth/providers/spotify';
import axios from 'axios';
import { TOKEN_ENDPOINT } from '@/constants/spotify-api-endpoints';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const getAccessToken = async (refresh_token: string) => {
	try {
		const response = await axios.post(
			TOKEN_ENDPOINT,
			{
				grant_type: 'refresh_token',
				refresh_token,
			},
			{
				headers: {
					Authorization: `Basic ${basic}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
		}),
	],
	pages: { signIn: '/' },
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				return {
					access_token: account.access_token,
					expires_at: account.expires_at!,
					refresh_token: account.refresh_token,
				};
			} else if (
				typeof token.expires_at === 'number' &&
				Date.now() < token.expires_at
			) {
				return token;
			} else {
				try {
					const tokens: any = await getAccessToken(
						token.refresh_token as string,
					);
					return {
						...token,
						access_token: tokens.access_token,
						expires_at: Date.now() + tokens.expires_in * 1000,
						refresh_token: tokens.refresh_token ?? token.refresh_token,
					};
				} catch (error) {
					console.error('Error refreshing access token', error);
					return { ...token, error: 'RefreshAccessTokenError' as const };
				}
			}
		},
		async session({ session, user, token }) {
			if (user) {
				session.user = user;
			}
			session.access_token = token.access_token;
			return session;
		},
	},
};
export default NextAuth(authOptions);
