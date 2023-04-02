import { ItemTrack } from '@/interfaces/spotify.interface';

export const removeFirstItem = (array: ItemTrack[]) => {
	const copy = [...array];
	copy.shift();
	return copy;
};
