import { Card } from "@/components/ui/card";
import { useQuery } from "react-query";
import { API_URL } from "@/helpers/endpoints";
import { AnimatePresence, motion } from "framer-motion";

const Player = () => {
	const { data, isLoading } = useQuery(
		"getSong",

		async () => {
			const res = await fetch(`${API_URL}/getCurrentTrack.php`);
			return res.json();
		},
		{ refetchInterval: 10000, refetchIntervalInBackground: true },
	);

	// 10500

	if (isLoading) {
		return null;
	}

	if (!data?.item) {
		return null;
	}

	const { name, album } = data.item;

	const artistList = album.artists.map((artist: any) => artist.name).join(", ");
	const albumImage = album.images[0].url;
	const spotifyUrl = album.external_urls.spotify;
	const isPlaying = data.is_playing;

	const progressBar = () => {
		const progress = data.progress_ms;
		const duration = data.item.duration_ms;
		const percentage = (progress / duration) * 100;
		return percentage;
	};

	const currentTime = () => {
		const progress = data.progress_ms;
		const minutes = Math.floor(progress / 60000);
		const seconds = ((progress % 60000) / 1000).toFixed(0);
		if (Number(seconds) < 10) {
			// place a zero in front of the seconds if it is less than 10
			return `${minutes}:0${seconds}`;
		}
		return `${minutes}:${seconds}`;
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
					initial={{ bottom: "-20%", display: "none", opacity: 0 }}
					animate={{ bottom: 0, display: "block", opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit={{ bottom: "-20%", display: "none", opacity: 0 }}
					className=" sticky bottom-0 left-0 right-0  mx-auto transform  -translate-y-1/3  w-11/12 lg:w-2/5 rounded-xl shadow-sm"
				>
					<Card
						className=" bg-neutral-800 border-0 text-white  rounded-xl  "
						style={{ backgroundImage: `url(${albumImage})` }}
					>
						<div className="backdrop-blur-3xl  w-full h-full rounded-xl p-3 backdrop-brightness-50 ">
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
										<a className="text-sm font-bold  mix-blend-difference" href={spotifyUrl} target="_blank">
											{name}
										</a>
										<p className="text-sm  mix-blend-difference">{artistList}</p>
									</div>
								</div>
							</div>
							{/* timeslider */}
							<div className="mt-3 relative">
								<div className="w-full h-1 bg-neutral-700 rounded-full absolute"></div>
								<div
									className="w-full h-1 bg-white rounded-full absolute mix-blend-difference"
									style={{ width: `${progressBar()}%` }}
								></div>
							</div>
							<div className="flex items-center justify-between mt-4">
								<p className="text-sm font-bold mix-blend-difference">{currentTime()}</p>
								<p className="text-sm font-bold mix-blend-difference">{songLength()}</p>
							</div>

							{/* <div className="flex items-center justify-between mt-3">
					<p className="text-sm font-bold">0:00</p>
					<p className="text-sm font-bold">3:00</p>
				</div>
				<div className="mt-3">
					<div className="w-full h-1 bg-neutral-700 rounded-full"></div>
					<div className="w-1/2 h-1 bg-white rounded-full"></div>
				</div> */}
						</div>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Player;
