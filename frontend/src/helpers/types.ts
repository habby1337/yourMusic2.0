export interface genre {
	title: string;
	description: string;
	imageUrl?: string;
	trackUri: string;
}

export interface userResponse {
	id: string;
	display_name: string;
	images: image[];
	product: "free" | "premium";
	external_urls: external_urls;
}

export interface trackSearchResult {
	tracks: tracks;
}

export interface playlistSearchResult {
	items: playlistItem[];
}

export interface playlistItem extends track {
	track: track;
}

export interface getPlaylistImageResponse {
	url: string;
	height: number | null;
	width: number | null;
}
export interface tracks {
	href: string;
	items: track[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
}

export interface track {
	album: album;
	artists: artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: external_ids;
	external_urls: external_urls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface album {
	album_type: string;
	artists: artist[];
	available_markets: string[];
	external_urls: external_urls;
	href: string;
	id: string;
	images: image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface image {
	height: number;
	url: string;
	width: number;
	[key: string]: string | number;
}

export interface artist {
	external_urls: external_urls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
	images: image[];
}

export interface external_urls {
	spotify: string;
	[key: string]: string;
}

export interface external_ids {
	isrc: string;
	[key: string]: string;
}
