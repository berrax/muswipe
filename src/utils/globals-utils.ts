export const removeFirstItem = (array: any[]) => {
	if (!Array.isArray(array)) throw new TypeError('Parameter must be an array');
	const copy = [...array];
	copy.shift();
	return copy;
};
