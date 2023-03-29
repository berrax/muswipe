import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type TResponse<T> = AxiosResponse<T, any>;
type TService<T> = (payload: any) => Promise<TResponse<T>>;

interface Props<T> {
	service: TService<T>;
}

export const useMutationApi = <T>({
	service,
}: Props<T>): UseMutationResult<T> => {
	const mutation = useMutation({
		mutationFn: payload => service(payload),
		onError: error => console.log('Error useMutationApi', error),
	});
	return mutation as UseMutationResult<T>;
};
