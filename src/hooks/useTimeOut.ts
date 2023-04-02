import { useRef } from 'react';

type TimeoutId = ReturnType<typeof setTimeout>;

export default function useTimeout() {
	const timeoutIdRef = useRef<TimeoutId | null>(null);

	const timeOut = (ms: number): Promise<void> => {
		return new Promise(resolve => {
			timeoutIdRef.current = setTimeout(() => {
				resolve();
			}, ms);
		});
	};

	const clearTimeOut = () => {
		if (timeoutIdRef.current !== null) {
			clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		}
	};

	return { timeOut, clearTimeOut };
}
