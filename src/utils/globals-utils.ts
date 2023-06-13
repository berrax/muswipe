export const removeFirstItem = (array: any[]) => {
	if (!Array.isArray(array)) throw new TypeError('Parameter must be an array');
	const copy = [...array];
	copy.shift();
	return copy;
};

export const formatTime = (milliseconds: number) => {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60;

	let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	let formattedSeconds =
		remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

	return formattedMinutes + ':' + formattedSeconds;
};
