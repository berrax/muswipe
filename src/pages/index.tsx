import { GetStaticProps } from 'next';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ITransversal } from '@/interfaces/contentful.interface';
import { useTheme } from '../hooks/useTheme';

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
	const session = useSession();
	const { isDarkTheme, toggleTheme } = useTheme();

	useEffect(() => {
		if (session.status === 'authenticated') {
			router.push('/swipe');
		}
	}, [session.status]);

	if (!session) return null;

	return (
		<>
			<h1>{data.tituloPrincipal}</h1>
			<h2>{session?.status}</h2>

			<div>
				<h3>Not signed</h3>
				<button onClick={() => signIn('spotify')}>
					{data.accionPrincipal}
				</button>
				<p>Actual theme: {isDarkTheme ? 'dark' : 'light'}</p>
				<button onClick={toggleTheme}>Change Theme</button>
			</div>
		</>
	);
}
