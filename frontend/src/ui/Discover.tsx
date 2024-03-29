import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { genres } from "@/helpers/arrayList";
import { Genre, GetPlaylistImageResponse } from "@/helpers/types";

import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/helpers/endpoints";

const Title = () => {
	return (
		<div className="flex items-baseline justify-between mb-4 ">
			<h1 className="text-[28px]">Discover new</h1>
			<div>
				<a href="/discover" className="flex items-center gap-1 align-bottom">
					<p className="text-sm ">View more genres</p>
					<ArrowRight size={14} strokeWidth={3} />
				</a>
			</div>
		</div>
	);
};

export const CardSlider = () => {
	return (
		<div className="flex flex-no-wrap items-start gap-5 pb-4 overflow-x-scroll scrolling-touch ">
			{genres.slice(0, 10).map((genre) => (
				<GenreCard
					title={genre.title}
					description={genre.description}
					imageUrl={genre.imageUrl}
					trackUri={genre.trackUri}
					key={genre.title}
					width="w-[10rem]"
				/>
			))}
		</div>
	);
};

export const GenreCard = ({ title, imageUrl, trackUri, width }: Genre & { width: string }) => {
	const navigate = useNavigate();
	const encodedTitle = encodeURIComponent(title);

	const controls = useAnimation();
	const cardRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(cardRef);

	useEffect(() => {
		if (isInView) {
			controls.start({ opacity: 1, x: 0 });
		}
	}, [isInView]);

	const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
	const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
	const placeHolderImage = "https://richphp.com/css-cover-music-loading-screen.png";

	useEffect(() => {
		if (trackUri === "") return;
		if (imageUrl !== undefined) return setProcessedImageUrl(imageUrl);

		setIsLoadingImage(true);

		const parsedTrackUri = trackUri.split("PL=")[1];

		const url = `${API_URL}/getPlaylistImage.php?uri=${parsedTrackUri}`;
		const request = fetch(url);
		request
			.then((response) => response.json())
			.then((data: GetPlaylistImageResponse[]) => {
				setProcessedImageUrl(data[0].url);
				// setImageUrl(data.images[0].url);
			})
			.finally(() => setIsLoadingImage(false));
	}, [trackUri, imageUrl, isInView]);

	return (
		<motion.div
			ref={cardRef}
			initial={{ opacity: 0 }}
			animate={controls}
			transition={{ duration: 0.6 }}
			className=""
			style={{ zIndex: 0 }}
		>
			<Card
				onClick={() => navigate(`/discover/${trackUri}/${encodedTitle}`)}
				className={`cursor-pointer ${width} relative overflow-clip border-0 bg-neutral-800 rounded-3xl aspect-square `}
			>
				<div className="absolute z-20 flex top-0 backdrop-blur-[2px] text-white w-full font-semibold justify-center  bg-neutral-900 bg-opacity-60">
					<div className="p-2 pt-1 pb-1 text-lg ">{title}</div>
				</div>

				<div className="relative flex justify-center">
					<img
						src={isLoadingImage ? placeHolderImage : processedImageUrl}
						alt=""
						className="absolute z-10 self-center w-48 opacity-80 rounded-2xl snap-center aspect-square"
					/>
					<img
						src={isLoadingImage ? placeHolderImage : processedImageUrl}
						alt=""
						className="z-0 self-center w-full blur-xl aspect-square "
					/>
				</div>

				{/* <div className="absolute bottom-0 z-30 w-full  pt-0 pb-1 text-left bg-opacity-50 bg-neutral-900 backdrop-blur-[2px]">
					<CardDescription className="p-2 text-sm text-white">{description}</CardDescription>
				</div> */}
			</Card>
		</motion.div>
	);
};

const Discover = () => {
	return (
		<div className="p-2 mt-8 rounded shadow-lg">
			<Title />
			<CardSlider />
		</div>
	);
};
export default Discover;
