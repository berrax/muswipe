import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { SpotifyServices } from '@/services/spotify/spotify.services';
import { IPropsChildren } from '@/interfaces/globals.interface';
import { IUser } from '@/interfaces/auth.interface';
import { useQueryApi } from './useQueryApi';

export const AuthContext = createContext<IUser | undefined>(null as any);

export const AuthProvider = ({ children }: IPropsChildren) => {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProviderAuth() {
	const [user, setUser] = useState<IUser>();

	const query = useQueryApi({
		queryKey: ['userData'],
		service: SpotifyServices.getUserInfo,
		staleTime: 1000 * 60,
	});

	useEffect(() => {
		if (query.data?.data?.email) {
			setUser({
				name: query.data.data.display_name,
				email: query.data.data.email,
				image: query.data.data.images?.[0].url,
			});
		}
	}, [query.data]);

	return user;
}
