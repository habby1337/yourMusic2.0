import { ArrowRight } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { genres } from "@/helpers/arrayList";
import { genre } from "@/helpers/types";
import { handleAddToQueue } from "@/helpers/utils";

const Title = () => {
	return (
		<div className="flex items-baseline justify-between mb-4 ">
			<h1 className="text-[28px]">Discover new</h1>
			<div className="flex items-center gap-1 align-bottom">
				<p className="text-sm ">View more genres</p>
				<ArrowRight size={14} strokeWidth={3} />
			</div>
		</div>
	);
};

const CardSlider = () => {
	return (
		<div className="flex flex-no-wrap items-start gap-5 overflow-x-scroll scrolling-touch">
			{genres.slice(0, 10).map((genre) => (
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

const GenreCard = ({ title, description, imageUrl, trackUri }: genre) => {
	return (
		<Card
			onClick={() => handleAddToQueue(trackUri)}
			className="cursor-pointer w-3/6 sm:w-1/4 md:w-1/5 lg:w-1/6 h-[15rem] relative overflow-clip border-0 bg-neutral-800 rounded-3xl flex-none mb-8"
		>
			<div className="absolute flex radial-bg  backdrop-blur-[1px] text-white w-full h-48 font-bold justify-center items-center rounded-b-3xl">
				<div className="text-lg ">{title}</div>
			</div>
			<img src={imageUrl} alt="" className="w-full h-48 rounded-b-3xl" />
			<div className="p-3 pt-0 ">
				<CardDescription className="pt-1 text-sm text-white">{description}</CardDescription>
			</div>
		</Card>
	);
};

const Discover = () => {
	return (
		<div className="mt-8">
			<Title />
			<CardSlider />
		</div>
	);
};
export default Discover;
