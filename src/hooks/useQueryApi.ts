import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface Props<T> {
	queryKey: any[];
	staleTime?: number;
	placeholderData?: T;
	service: () => Promise<AxiosResponse<T>>;
	select?: (data: T | undefined) => T;
	enabled?: boolean;
}

export const useQueryApi = <T>({
	queryKey,
	staleTime,
	placeholderData,
	service,
	select,
	enabled = true,
}: Props<T>): UseQueryResult<AxiosResponse<T>> => {
	const query = useQuery({
		queryKey,
		queryFn: service,
		//select,
		staleTime,
		//placeholderData,
		enabled,
	});
	return query as UseQueryResult<AxiosResponse<T>>;
};
