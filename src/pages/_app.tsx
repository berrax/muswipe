import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/hooks/useTheme';
import { PlayerProvider } from '@/hooks/usePlayer';
import { store } from '@/store/store';
import { LoadingLottie } from '@/components/organisms/loading-lottie/loading-lottie';
import { IPropsChildren } from '@/interfaces/globals.interface';
import Player from '@/components/atoms/player/player';
import '@/styles/globals.scss';
import { useQueryApi } from '@/hooks/useQueryApi';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { oneHourInMS } from '@/constants/globals';
import { setUser } from '@/store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider>
						<div className={poppins.className}>
							{Component.auth ? (
								<Auth>
									<PlayerProvider>
										<Player />
										<Component {...pageProps} />
									</PlayerProvider>
								</Auth>
							) : (
								<Component {...pageProps} />
							)}
						</div>
					</ThemeProvider>
				</QueryClientProvider>
			</Provider>
		</SessionProvider>
	);
}

function Auth({ children }: IPropsChildren) {
	const { status } = useSession({ required: true });
	const user = useAppSelector(state => state.user.value);
	const dispatch = useAppDispatch();

	const query = useQueryApi({
		queryKey: ['userData'],
		service: SpotifyServices.getUserInfo,
		staleTime: oneHourInMS * 4,
		enabled: status === 'authenticated',
	});

	useEffect(() => {
		if (query.data?.email && !user.email) {
			dispatch(
				setUser({
					name: query.data?.display_name,
					email: query.data?.email,
					image: query.data?.images?.[0].url,
					username: query.data?.id,
					list: 1,
					discoverd: 0,
				}),
			);
		}
	}, [query.data]);

	if (status === 'loading') {
		return <LoadingLottie />;
	}

	return <>{children}</>;
}
