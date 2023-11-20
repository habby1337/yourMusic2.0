import { trackList } from "@/helpers/arrayList";
import { ResultTrackItem } from "./Search";
import { track } from "@/helpers/types";

const Suggestions = () => {
	return (
		<div>
			<h4 className="mb-3 font-semibold">Suggestions for you</h4>
			<div className="max-h-[60vh] overflow-scroll">
				<SuggestionCards />
			</div>
		</div>
	);
};

export default Suggestions;

const SuggestionCards = () => {
	// get 20 suggestions from tracklist starting at random index
	const randomIndex = Math.floor(Math.random() * trackList.length);
	const suggestions = trackList.slice(randomIndex, randomIndex + 5);

	return (
		<>
			{suggestions.map((track: track) => (
				<ResultTrackItem key={track.id} item={track} />
			))}
		</>
	);
};

//TODO Implement infinite scorll
