export interface Genre {
	title: string;
	description: string;
	imageUrl?: string;
	trackUri: string;
}

export enum ProductType {
	Free = "free",
	Premium = "premium",
}

export interface UserResponse {
	id: string;
	display_name: string;
	images: Image[];
	product: ProductType;
	external_urls: ExternalUrls;
}

export interface TrackSearchResult {
	tracks: Tracks;
}

export interface PlaylistSearchResult {
	items: PlaylistItem[];
}

export interface PlaylistItem extends Track {
	track: Track;
}

export interface GetPlaylistImageResponse {
	url: string;
	height?: number | null;
	width?: number | null;
}

export interface Tracks {
	href: string;
	items: Track[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
}

export interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string | null; // Use null explicitly for potentially missing values
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
	images: Image[];
}

export interface ExternalUrls {
	spotify: string;
	[key: string]: string;
}

export interface ExternalIds {
	isrc: string;
	[key: string]: string;
}

export interface CurrentPlayback {
	actions: Actions;
	context: Context;
	currently_playing_type: string;
	is_playing: boolean;
	item: Track;
	progress_ms: number;
	timestamp: number;
}

export interface Actions {
	disallows: {
		resuming: boolean;
		toggling_repeat_context: boolean;
		toggling_repeat_track: boolean;
		toggling_shuffle: boolean;
	};
}

export interface Context {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
}

export interface SuccessRecommendationsResponse {
	tracks: Track[];
	seeds: Seed[];
}

export interface ErrorResponse {
	message: string;
	code: number;
}

export interface Seed {
	afterFilteringSize: number;
	afterRelinkingSize: number;
	href: string;
	id: string;
	initialPoolSize: number;
	type: string;
}
