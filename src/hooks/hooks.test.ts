import { renderHook, act } from '@testing-library/react';
import useTimeout from './useTimeOut';

jest.useFakeTimers();

describe('useTimeout', () => {
	it('should resolve after specific time', async () => {
		const { result } = renderHook(() => useTimeout());
		const { timeOut } = result.current;
		const ms = 1000;
		const promise = timeOut(ms);

		act(() => {
			jest.advanceTimersByTime(ms);
		});
		await expect(promise).resolves.toBeTruthy();
	});
});
