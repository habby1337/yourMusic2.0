import { trackList } from "@/helpers/arrayList";
import { ResultTrackItem, ResultTrackListSkeleton } from "./Search";
import { track } from "@/helpers/types";
import { useInfiniteQuery } from "react-query";
import { generateRandomString } from "@/helpers/utils";
import { API_URL } from "@/helpers/endpoints";
import { useEffect, useRef } from "react";

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
			uri: item.uri,
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
			<div id="suggestions-container" className="max-h-[30vh] overflow-scroll">
				<SuggestionCards
					suggestions={allSuggestions}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
				{isFetchingNextPage && <ResultTrackListSkeleton number={5} />}
				{/* {hasNextPage && (
					<button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? "Loading more..." : "Load More"}
					</button>
				)} */}
			</div>
		</div>
	);
};

export default Suggestions;

const SuggestionCards = ({
	suggestions,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: {
	suggestions: track[];
	fetchNextPage: any;
	hasNextPage: any;
	isFetchingNextPage: boolean;
}) => {
	// get 20 suggestions from tracklist starting at random index
	// const randomIndex = Math.floor(Math.random() * trackList.length);
	// const suggestions = trackList.slice(randomIndex, randomIndex + 5);
	const lastItemRef = useRef<HTMLDivElement>(null);
	const scrollObserver = useRef<IntersectionObserver | null>(null);

	const loadMore = (entries: IntersectionObserverEntry[]) => {
		const target = entries[0];
		if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	useEffect(() => {
		scrollObserver!.current = new IntersectionObserver(loadMore, {
			root: document.getElementById("suggestion-container"),
			rootMargin: "0px",
			threshold: 1,
		});

		if (lastItemRef.current && scrollObserver.current) {
			scrollObserver.current.observe(lastItemRef.current);
		}

		return () => {
			if (scrollObserver.current) {
				scrollObserver.current.disconnect();
			}
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<>
			{suggestions.map((track: track, index: number) => (
				<ResultTrackItem key={track.id} item={track} ref={index === suggestions.length - 1 ? lastItemRef : null} />
			))}
		</>
	);
};

//TODO Implement infinite scorll
