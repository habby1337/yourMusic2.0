import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Title = () => {
	return (
		<div className=" flex justify-between items-baseline mb-4">
			<h1 className="text-[28px]">Discover new</h1>
			<div className="flex align-bottom items-center gap-1">
				<p className="text-sm ">View more genres</p>
				<ArrowRight size={14} strokeWidth={3} />
			</div>
		</div>
	);
};

const CardSlider = () => {
	return (
		<div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start gap-5">
			<GenreCard
				title="Blues"
				description="Listen to popular tracks"
				imageUrl="https://seeded-session-images.scdn.co/v1/img/artist/6iWF9SfkRbKQwIHaTzgpgX/de"
			/>
			<GenreCard
				title="Hip Hop"
				description="Get some hiphop vibes"
				imageUrl="https://seeded-session-images.scdn.co/v1/img/artist/45rVykSnbTDeLDAcguWln3/en"
			/>
			<GenreCard
				title="Hip Hop"
				description="Get some hiphop vibes"
				imageUrl="https://seeded-session-images.scdn.co/v1/img/artist/45rVykSnbTDeLDAcguWln3/en"
			/>
			<GenreCard
				title="Hip Hop"
				description="Get some hiphop vibes"
				imageUrl="https://seeded-session-images.scdn.co/v1/img/artist/45rVykSnbTDeLDAcguWln3/en"
			/>
		</div>
	);
};

const GenreCard = ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => {
	return (
		<Card className="w-3/6 lg:w-1/6 h-[15rem] relative overflow-clip border-0 bg-neutral-800 rounded-3xl flex-none mb-8">
			<div className="absolute flex radial-bg  backdrop-blur-[1px] text-white w-full h-48 font-bold justify-center items-center rounded-b-3xl">
				<div className="text-lg   ">{title}</div>
			</div>
			<img src={imageUrl} alt="" className="w-full h-48 rounded-b-3xl" />
			<div className="absolute bottom-0 pb-3 p-2 ">
				<CardDescription className="text-white font-bold text-base pt-1">{description}</CardDescription>
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
