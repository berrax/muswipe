import { GetStaticProps } from 'next';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { useAuth } from '@/hooks/useAuth';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ITransversal } from '@/interfaces/contentful.interface';

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data, status } = await ContentfulServices.getTransversal(
			'login-page',
		);
		return {
			props: { data: status === 200 ? data.data.pageCollection.items[0] : {} },
		};
	} catch (error) {
		console.log('getStaticProps Error: ', error);
		return {
			props: { data: {} },
		};
	}
};

interface IProps {
	data: ITransversal;
}

export default function Component({ data }: IProps) {
	const router = useRouter();
	const { isDarkTheme, toggleTheme, user } = useAuth();
	console.log(data);
	useEffect(() => {
		if (user?.email) {
			router.push('/swipe');
		}
	}, [user]);

	return (
		<>
			<h1>{data.tituloPrincipal}</h1>
			<h2>{user?.status}</h2>
			{user?.email ? (
				<>
					{user.email && <h3>Bienvenido {user.name || ''}</h3>}
					Signed in as {user.email}
					<br />
					<button onClick={() => signOut()}>Sign out</button>
					<p>Actual theme: {isDarkTheme ? 'dark' : 'light'}</p>
					<button onClick={toggleTheme}>Change Theme</button>
				</>
			) : (
				<div>
					<h3>Not signed</h3>
					<button onClick={() => signIn('spotify')}>
						{data.accionPrincipal}
					</button>
				</div>
			)}
		</>
	);
}
