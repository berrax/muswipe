import { createContext, useContext, useState } from 'react';
import { IPropsChildren } from '@/interfaces/globals.interface';

interface IPlayer {
	audioUrl: string;
	isReproducing: boolean;
	setTrack: (audio: string) => void;
	reproduce: (value: boolean) => void;
	element: HTMLAudioElement | null;
	initElement: (elem: HTMLAudioElement) => void;
	togglePlayer: (audio: string) => void;
}

export const PlayerContext = createContext<IPlayer>(null as any);

export const PlayerProvider = ({ children }: IPropsChildren) => {
	const player = useProviderPlayer();
	return (
		<PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
	);
};

export const usePlayer = () => useContext(PlayerContext);

function useProviderPlayer() {
	const [audioUrl, setAudioUrl] = useState('');
	const [isReproducing, setIsReproducing] = useState(false);
	const [element, setElement] = useState<HTMLAudioElement | null>(null);

	const reproduce = (value: boolean) => setIsReproducing(value);
	const setTrack = (audio: string) => setAudioUrl(audio);
	const initElement = (elem: HTMLAudioElement) => setElement(elem);

	const togglePlayer = (audio: string) => {
		if (element) {
			if (audio !== audioUrl) {
				setTrack(audio);
				if (!isReproducing) {
					element.load();
					element.play();
				}
			} else {
				!isReproducing ? element.play() : element.pause();
			}
		}
	};

	return {
		audioUrl,
		isReproducing,
		element,
		reproduce,
		setTrack,
		initElement,
		togglePlayer,
	};
}
