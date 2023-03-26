import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import '@/styles/globals.scss';
import { AuthProvider } from '@/hooks/useAuth';

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<AuthProvider>
				{Component.auth ? (
					<Auth>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
				)}
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
