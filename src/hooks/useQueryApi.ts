import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type TResponse<T> = AxiosResponse<T, any>;
type TService<T> = () => Promise<TResponse<T>>;

interface Props<T> {
	queryKey: any[];
	staleTime?: number;
	cacheTime?: number;
	placeholderData?: T;
	service: TService<T>;
	enabled?: boolean;
}

export const useQueryApi = <T>({
	queryKey,
	staleTime,
	cacheTime,
	placeholderData,
	service,
	enabled = true,
}: Props<T>): UseQueryResult<T> => {
	const query = useQuery({
		queryKey,
		queryFn: () => fetchData<T>(service),
		staleTime,
		cacheTime,
		placeholderData,
		enabled,
	});
	return query as UseQueryResult<T>;
};

const fetchData = async <T>(service: TService<T>): Promise<T | undefined> => {
	try {
		const response = await service();
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log('Error fetching data userQueryApi', error);
	}
};
