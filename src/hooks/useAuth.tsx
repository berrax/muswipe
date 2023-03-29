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
import { oneHourInMS } from '@/constants/globals';

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
		staleTime: oneHourInMS,
	});

	useEffect(() => {
		if (query.data?.email) {
			setUser({
				name: query.data?.display_name,
				email: query.data?.email,
				image: query.data?.images?.[0].url,
			});
		}
	}, [query.data]);

	return user;
}
