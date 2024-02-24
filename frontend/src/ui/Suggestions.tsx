import { ResultTrackItem, ResultTrackListSkeleton } from "./Search";
import { Artist, Track } from "@/helpers/types";
import { useInfiniteQuery } from "react-query";
import { generateRandomString } from "@/helpers/utils";
import { API_URL } from "@/helpers/endpoints";
import { useEffect, useRef } from "react";
import { HeartCrack } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Suggestions = () => {
	const fetchSuggestions = async ({ pageParam = 1 }: { pageParam?: number }) => {
		const randomString = generateRandomString(3);

		const response = await fetch(
			`${API_URL}/getSearchInfo.php?q=${randomString}&limit=5&offset=${(pageParam - 1) * 5}`,
		);

		const data = await response.json();

		const suggestions = data.tracks.items.map((item: Track) => ({
			id: item.id,
			name: item.name,
			uri: item.uri,
			album: {
				id: item.album.id,
				name: item.album.name,
				images: item.album.images,
			},
			artists: item.artists.map((artist: Artist) => ({
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
			<h4 className="mt-4 mb-2 font-semibold">Suggestions for you</h4>
			<div id="suggestions-container" className="max-h-[42vh]  overflow-y-scroll">
				{allSuggestions.length === 0 && (
					<div className="flex items-center justify-center h-full p-5 space-x-2 text-neutral-400">
						<HeartCrack size={20} />
						<p className="text-sm ">No suggestions available at this time</p>
						<HeartCrack size={20} />
					</div>
				)}

				<SuggestionCards
					suggestions={allSuggestions}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
				{isFetchingNextPage && <ResultTrackListSkeleton number={5} />}
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
	suggestions: Track[];
	fetchNextPage: any;
	hasNextPage: any;
	isFetchingNextPage: boolean;
}) => {
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
			root: document.getElementById("suggestions-container"),
			rootMargin: "0px",
			threshold: 0.4,
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
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 100 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
			>
				{suggestions.map((track: Track, index: number) => (
					<ResultTrackItem key={track.id} item={track} ref={index === suggestions.length - 1 ? lastItemRef : null} />
				))}
			</motion.div>
		</AnimatePresence>
	);
};

//TODO Implement infinite scorll
