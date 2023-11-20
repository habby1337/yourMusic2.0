import { trackList } from "@/helpers/arrayList";
import { ResultTrackItem } from "./Search";
import { track } from "@/helpers/types";
import { useInfiniteQuery } from "react-query";
import { generateRandomString } from "@/helpers/utils";
import { API_URL } from "@/helpers/endpoints";

const Suggestions = () => {
	const fetchSuggestions = async ({ pageParam = 1 }: { pageParam?: number }) => {
		const randomString = generateRandomString(3);

		const response = await fetch(
			`${API_URL}/getSearchInfo.php?q=${randomString}&limit=5&offset=${(pageParam - 1) * 5}`,
		);

		const data = await response.json();

		const suggestions = data.tracks.items.map((item: track) => ({
			id: item.id,
			name: item.name,
			album: {
				id: item.album.id,
				name: item.album.name,
				images: item.album.images,
			},
			artists: item.artists.map((artist: any) => ({
				id: artist.id,
				name: artist.name,
				images: artist.images,
			})),
		}));

		return {
			suggestions,
			nextPage: data.tracks.next,
		};
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery("suggestions", fetchSuggestions, {
		getNextPageParam: (lastPage) => lastPage.nextPage || null,
	});

	const allSuggestions = data ? data.pages.flatMap((page) => page.suggestions) : [];

	return (
		<div>
			<h4 className="mb-4 mt-4 font-semibold">Suggestions for you</h4>
			<div className="max-h-[30vh] overflow-scroll">
				<SuggestionCards suggestions={allSuggestions} />
				{hasNextPage && (
					<button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? "Loading more..." : "Load More"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Suggestions;

const SuggestionCards = ({ suggestions }: { suggestions: track[] }) => {
	// get 20 suggestions from tracklist starting at random index
	// const randomIndex = Math.floor(Math.random() * trackList.length);
	// const suggestions = trackList.slice(randomIndex, randomIndex + 5);

	return (
		<>
			{suggestions.map((track: track) => (
				<ResultTrackItem key={track.id} item={track} />
			))}
		</>
	);
};

//TODO Implement infinite scorll
