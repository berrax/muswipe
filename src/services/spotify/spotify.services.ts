import spotifyInstance from './spotify.instance';
import { BASIC_INFO_ENDPOINT } from '@/constants/spotify-api-endpoints';
import { AxiosResponse } from 'axios';
import { ISpotifyUser } from '@/interfaces/spotify.interface';

export class SpotifyServices {
	static getUserInfo(): Promise<AxiosResponse<ISpotifyUser>> {
		return spotifyInstance.get(BASIC_INFO_ENDPOINT);
	}
}
