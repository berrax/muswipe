import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/hooks/useTheme';
import { Poppins } from 'next/font/google';
import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const poppins = Poppins({
	weight: ['400', '500', '700'],
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
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<div className={poppins.className}>
						{Component.auth ? (
							<Auth>
								<Component {...pageProps} />
							</Auth>
						) : (
							<Component {...pageProps} />
						)}
					</div>
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

function Auth({ children }) {
	const { status } = useSession({ required: true });

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return <AuthProvider>{children}</AuthProvider>;
}
