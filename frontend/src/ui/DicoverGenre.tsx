import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import SearchForm, { ResultTrackItem, ResultTrackListSkeleton } from "./Search";
import { GenreCard } from "./Discover";
import { genres } from "../helpers/arrayList";
import { capitalizeString } from "@/helpers/utils";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/helpers/endpoints";
import { useQuery } from "react-query";
import { track } from "@/helpers/types";

const DiscoverGenre = () => {
	const navigate = useNavigate();
	const { genre } = useParams<{ genre: string }>();
	return (
		<div className="container w-screen h-screen p-4 overflow-y-hidden">
			<Navigation />
			<SearchForm />

			<div className="mt-10 space-y-5">
				<div className="flex items-center text-2xl font-semibold text-neutral-300">
					<button onClick={() => navigate(genre ? "/discover" : "/")} className="mr-3">
						<ArrowLeft size={20} strokeWidth={3} />
					</button>
					<p>{genre ? capitalizeString(genre) : "Discover"}</p>
				</div>
				<Separator decorative className="opacity-25" />

				{!genre && <DiscoverCardSection />}
				{genre && <DiscoverGenreSection genre={genre} />}
			</div>
		</div>
	);
};

export default DiscoverGenre;

const DiscoverCardSection = () => {
	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
			{genres.slice(0, 30).map((genre) => (
				<GenreCard
					title={genre.title}
					description={genre.description}
					imageUrl={genre.imageUrl}
					trackUri={genre.trackUri}
					key={genre.title}
				/>
			))}
		</div>
	);
};

const DiscoverGenreSection = ({ genre }: { genre: string }) => {
	const { data, isLoading, isError, error } = useQuery(["genre", genre], async () => {
		const response = await fetch(`${API_URL}/getSearchInfo.php?q=${genre}`);
		return response.json();
	});

	if (isLoading) {
		return <ResultTrackListSkeleton number={10} />;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	const convertToTrackArray = (data: any) => {
		const trackArray: track[] = [];

		data?.items.map((item: any) => {
			trackArray.push(item.track);
		});

		return trackArray;
	};

	console.log("Converted");

	return (
		<div className="overflow-y-scroll h-[72vh]">
			{convertToTrackArray(data).map((item: track) => (
				<ResultTrackItem key={item.id} item={item} />
			))}
		</div>
	);
};
