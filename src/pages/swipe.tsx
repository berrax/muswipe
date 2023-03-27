import { GetStaticProps } from 'next';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { useAuth } from '@/hooks/useAuth';
import { signIn, signOut } from 'next-auth/react';

export const getStaticProps: GetStaticProps = async () => {
	const { data, status } = await ContentfulServices.getTransversal('home-page');
	return {
		props: { data: status === 200 ? data : {} },
	};
};

export default function Component({ data }: any) {
	const { isDarkTheme, toggleTheme, user } = useAuth();

	return (
		<>
			<h1>SWIPE {user?.status}</h1>
			{user?.email ? (
				<>
					{user.email && <h1>Bienvenido {user.name || ''}</h1>}
					Signed in as {user.email}
					<br />
					<button onClick={() => signOut()}>Sign out</button>
					<p>Actual theme: {isDarkTheme ? 'dark' : 'light'}</p>
					<button onClick={toggleTheme}>Change Theme</button>
				</>
			) : (
				<div>
					<h1>Not signed</h1>
					<button onClick={() => signIn('spotify')}>Sign in</button>
				</div>
			)}
		</>
	);
}
