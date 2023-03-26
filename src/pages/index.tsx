import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SpotifyServices } from '../services/spotify/spotify.services';
import { ContentfulServices } from '@/services/contentful/contentful.services';
import useDarkMode from '@/hooks/useDarkMode';

export const getStaticProps: GetStaticProps = async () => {
	const query = `query {
		pageCollection{
			items{
				title
			}
		}
	}`;
	const { data, status } = await ContentfulServices.getContent(query);
	return {
		props: { data: status === 200 ? data : {} },
	};
};

export default function Component({ data }: any) {
	const { data: session } = useSession();
	const [isDarkMode, setIsDarkMode] = useDarkMode();
	const [userInfo, setUserInfo] = useState<any>({});

	const getUserInfo = async () => {
		try {
			const response = await SpotifyServices.getUserInfo();
			if (response?.status === 200) {
				//console.log('Resp:', response.data);
				setUserInfo(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	useEffect(() => {
		if (session) getUserInfo();
	}, [session]);
	useEffect(() => {
		console.log('content:', data.data.pageCollection.items);
	}, []);

	if (!session) {
		return (
			<div>
				<h1>Not signed</h1>
				<button onClick={() => signIn('spotify')}>Sign in</button>
			</div>
		);
	}

	if (session) {
		return (
			<>
				{userInfo.email && <h1>Bienvenido {userInfo.display_name || ''}</h1>}
				Signed in as {session?.user?.email}
				<br />
				<button onClick={() => signOut()}>Sign out</button>
				<p>Actual theme: {isDarkMode ? 'dark' : 'light'}</p>
				<button onClick={handleTheme}>Change Theme</button>
			</>
		);
	}
}
