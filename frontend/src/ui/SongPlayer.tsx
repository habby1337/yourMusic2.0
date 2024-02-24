import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "@/helpers/endpoints";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { artist } from "@/helpers/types";

const SongPlayer = () => {
	const [showPlayer, setShowPlayer] = useState(true);
	const [songProgress, setSongProgress] = useState(0);
	const [scope, animate] = useAnimate();
	const { data, isLoading } = useQuery(
		"getSong",

		async () => {
			const res = await fetch(`${API_URL}/getCurrentTrack.php`);
			return res.json();
		},
		{ refetchInterval: 10000, refetchIntervalInBackground: true },
	);

	useEffect(() => {
		if (!data?.is_playing) return;
		if (!showPlayer) animate(scope.current, { x: 0, y: 70, display: "block", opacity: 0.8 });
		else animate(scope.current, { x: 0, y: 0, display: "block", opacity: 1 });
	}, [showPlayer]);
	// 10500
	useEffect(() => {
		setSongProgress((data?.progress_ms / data?.item?.duration_ms) * 100 || 0);
	}, [data]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSongProgress((prevProgress) => (prevProgress + 1) % 100);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	if (isLoading) {
		return null;
	}

	if (!data?.item) {
		return null;
	}

	const { name, album } = data.item;

	const artistList = album.artists.map((artist: artist) => artist.name).join(", ");
	const albumImage = album.images[0].url;
	const spotifyUrl = album.external_urls.spotify;
	const isPlaying = data.is_playing;

	const formatTime = (progress: number) => {
		const minutes = Math.floor(progress / 60000);
		const seconds = ((progress % 60000) / 1000).toFixed(0);
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
	};

	const songLength = () => {
		const duration = data.item.duration_ms;
		const minutes = Math.floor(duration / 60000);
		const seconds = ((duration % 60000) / 1000).toFixed(0);

		return `${minutes}:${seconds}`;
	};

	return (
		<AnimatePresence>
			{isPlaying && (
				<motion.div
					// animate sliding from bottom to top
					initial={{ bottom: "-5%", opacity: 0 }}
					animate={{ bottom: 0, display: "block", opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit={{ bottom: "-5%", opacity: 0 }}
					ref={scope}
					className="sticky bottom-0 left-0 right-0 w-11/12 mx-auto transform shadow-sm lg:w-2/5 rounded-xl"
				>
					<Card
						className="text-white border-0 bg-neutral-800 rounded-xl"
						style={{ backgroundImage: `url(${albumImage})` }}
					>
						<div className="w-full h-full p-3 backdrop-blur-3xl rounded-xl backdrop-brightness-50">
							<div className="absolute top-1 right-2">
								{showPlayer && <ChevronDown size={30} strokeWidth={3} onClick={() => setShowPlayer(!showPlayer)} />}
								{!showPlayer && <ChevronUp size={30} strokeWidth={3} onClick={() => setShowPlayer(!showPlayer)} />}
							</div>
							<div className="flex items-center justify-between ">
								<div className="flex items-center gap-5">
									{/* if isPlaying true animate the image */}
									<a href={spotifyUrl} target="_blank">
										<motion.img
											src={albumImage}
											alt=""
											className="w-12 h-12 rounded-full"
											animate={{ rotate: isPlaying ? 360 : 0 }}
											transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
										/>
									</a>
									{/* <img src={albumImage} alt="" className="w-12 h-12 rounded-full"  /> */}
									<div>
										<a className="text-sm font-bold mix-blend-difference" href={spotifyUrl} target="_blank">
											{name}
										</a>
										<p className="text-sm mix-blend-difference">{artistList}</p>
									</div>
								</div>
							</div>
							{/* timeslider */}
							<div className="relative mt-3">
								<div className="absolute w-full h-1 rounded-full bg-neutral-700"></div>
								<div
									className="absolute w-full h-1 bg-white rounded-full mix-blend-difference"
									style={{ width: `${songProgress}%` }}
								></div>
							</div>
							<div className="flex items-center justify-between mt-4">
								<p className="text-sm font-bold mix-blend-difference">
									{formatTime((songProgress * data.item.duration_ms) / 100)}
								</p>
								<p className="text-sm font-bold mix-blend-difference">{songLength()}</p>
							</div>

							{/* <div className="flex items-center justify-between mt-3">
					<p className="text-sm font-bold">0:00</p>
					<p className="text-sm font-bold">3:00</p>
				</div>
				<div className="mt-3">
					<div className="w-full h-1 rounded-full bg-neutral-700"></div>
					<div className="w-1/2 h-1 bg-white rounded-full"></div>
				</div> */}
						</div>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SongPlayer;
