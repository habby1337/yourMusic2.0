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
	const { genre, title } = useParams<{ genre: string; title: string }>();

	return (
		<div className="container w-screen h-screen p-0">
			<div className="sticky top-0 z-20 p-3 pb-4 bg-neutral-900 backdrop-blur-xl bg-opacity-30">
				<Navigation />
				<SearchForm />
			</div>

			<div className="p-3 space-y-5">
				<div className="flex items-center text-2xl font-semibold text-neutral-300">
					<button onClick={() => navigate(title ? "/discover" : "/")} className="mr-3">
						<ArrowLeft size={20} strokeWidth={3} />
					</button>
					<p>{title ? capitalizeString(title) : "Discover"}</p>
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
		<div className="grid h-screen grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
			{genres.slice(0, 30).map((genre) => (
				<GenreCard
					title={genre.title}
					description={genre.description}
					imageUrl={genre.imageUrl}
					trackUri={genre.trackUri}
					key={genre.title}
					width="w-full"
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
		return <p>Error: {(error as Error).message}</p>;
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
