import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { AuthProvider } from '@/hooks/useAuth';
import { Poppins } from 'next/font/google';
import '@/styles/globals.scss';

const poppins = Poppins({
	weight: ['400', '500', '700'],
	style: ['normal'],
	subsets: ['latin'],
});

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<AuthProvider>
				<div className={poppins.className}>
					{Component.auth ? (
						<Auth>
							<Component {...pageProps} />
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</div>
			</AuthProvider>
		</SessionProvider>
	);
}

function Auth({ children }) {
	const { status } = useSession({ required: true });

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return children;
}
