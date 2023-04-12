import { describe, it, expect } from 'vitest';
import { removeFirstItem } from './globals-utils';

describe('Remove first item from array', () => {
	it('Should be a function', () => {
		expect(removeFirstItem).toBeInstanceOf(Function);
	});
	it('should throw an exception if no parameter is provided', () => {
		expect(() => removeFirstItem()).toThrow();
	});
	it('should throw an exception if the parameter is not an array', () => {
		expect(() => removeFirstItem()).toThrow();
	});
	it('should return a copy of the array without the first item', () => {
		const input = [1, 2, 3];
		const expectedOutput = [2, 3];
		expect(removeFirstItem(input)).toEqual(expectedOutput);
	});
	it('should not modify the original array', () => {
		const input = [1, 2, 3];
		removeFirstItem(input);
		expect(input).toEqual([1, 2, 3]);
	});
	it('should return an empty copy if the array has only one item', () => {
		const input = ['only'];
		const expectedOutput: any = [];
		expect(removeFirstItem(input)).toEqual(expectedOutput);
	});
});
