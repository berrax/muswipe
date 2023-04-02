export interface ISpotifyUser {
	country: string;
	display_name: string;
	email: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	href: string;
	id: string;
	images: Image[];
	product: string;
	type: string;
	uri: string;
}

export interface IPlaylist {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: ITracks;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Followers {
	href: string;
	total: number;
}

export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface Owner {
	external_urls: ExternalUrls;
	followers?: Followers;
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name?: string;
	name?: string;
}

export interface ITracks {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: ItemTrack[];
}

export interface ItemTrack {
	added_at: string;
	added_by: Owner;
	is_local: boolean;
	track: ITrack;
}

export interface ITrack {
	album: Album;
	artists: IArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: any;
	restrictions: Restrictions;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: Restrictions;
	type: string;
	uri: string;
	copyrights: Copyright[];
	external_ids: ExternalIDS;
	genres?: string[];
	label: string;
	popularity: number;
	album_group: string;
	artists: Owner[];
}

export interface Copyright {
	text: string;
	type: string;
}

export interface ExternalIDS {
	isrc: string;
	ean: string;
	upc: string;
}

export interface Restrictions {
	reason: string;
}

export interface IArtist {
	external_urls: ExternalUrls;
	followers: Followers;
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}
