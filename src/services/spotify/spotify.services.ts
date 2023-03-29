import { AxiosResponse } from 'axios';
import spotifyInstance from './spotify.instance';
import {
	BASIC_INFO_ENDPOINT,
	GET_ARTIST_ENDPOINT,
	GET_PLAYLISTS_ENDPOINT,
} from '@/constants/spotify-api-endpoints';
import {
	IArtist,
	IPlaylist,
	ISpotifyUser,
} from '@/interfaces/spotify.interface';

export class SpotifyServices {
	static getUserInfo(): Promise<AxiosResponse<ISpotifyUser>> {
		return spotifyInstance.get(BASIC_INFO_ENDPOINT);
	}
	static getPlaylistByID(
		playListId: string,
	): Promise<AxiosResponse<IPlaylist>> {
		return spotifyInstance.get(`${GET_PLAYLISTS_ENDPOINT}/${playListId}`);
	}
	static getArtistByID(artistId: string): Promise<AxiosResponse<IArtist>> {
		return spotifyInstance.get(`${GET_ARTIST_ENDPOINT}/${artistId}`);
	}
}
