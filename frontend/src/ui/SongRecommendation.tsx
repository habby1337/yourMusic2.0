import { API_URL } from "@/helpers/endpoints";
import { SuccessRecommendationsResponse } from "@/helpers/types";
import { HeartCrack } from "lucide-react";
import { useQuery } from "react-query";
import { ResultTrackItem, ResultTrackListSkeleton } from "./Search";
import { AnimatePresence, motion } from "framer-motion";

const SongRecommendation = ({ limit }: { limit: number }) => {
	const fetchSongsRecommendation = async (): Promise<SuccessRecommendationsResponse> => {
		const response = await fetch(`${API_URL}/getRecommendations.php?limit=${limit}`);

		return response.json() as Promise<SuccessRecommendationsResponse>;
	};

	const {
		data: recommendationResponse,
		isError,
		isLoading,
	} = useQuery("songsList", fetchSongsRecommendation, {
		refetchInterval: 300_000,
		retry: 3,
		keepPreviousData: true,
		// optimisticResults: true,

		// staleTime: 1000 * 60 * 60,
		// cacheTime: 1000 * 60 * 60,
	});

	// console.log(recommendationResponse);

	if (isLoading) {
		return <ResultTrackListSkeleton number={10} />;
	}

	if (!recommendationResponse || isError) {
		return (
			<div className="flex items-center justify-center h-full p-5 my-auto mt-5 space-x-2 text-neutral-400">
				<HeartCrack size={20} />
				<p className="text-base ">No suggestions available at this time</p>
				<HeartCrack size={20} />
			</div>
		);
	}
	// console.log(recommendationResponse);
	const { tracks } = recommendationResponse;

	return (
		<div className="p-2 pt-0 rounded shadow-lg">
			<h4 className="mt-4 mb-2 font-semibold">Suggestions for you</h4>
			<div className="max-h-[40vh]  overflow-y-scroll">
				<SuggestionsCards suggestions={tracks} />
			</div>
		</div>
	);
};
export default SongRecommendation;

const SuggestionsCards = ({ suggestions }: { suggestions: SuccessRecommendationsResponse["tracks"] }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				// className="grid grid-cols-2 gap-4"
			>
				{suggestions.map((track) => (
					<ResultTrackItem key={track.id} item={track} />
				))}
			</motion.div>
		</AnimatePresence>
	);
};
