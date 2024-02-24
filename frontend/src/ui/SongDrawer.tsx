import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { API_URL } from "@/helpers/endpoints";
import { Artist, CurrentPlayback } from "@/helpers/types";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
const SongDrawer = () => {
	return (
		<div className="absolute bottom-0 w-full">
			<SongCard />
		</div>
	);
};

const SongCard = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [songProgress, setSongProgress] = useState(0);
	const [drawerPlaceholder, animate] = useAnimate();
	const [rotateDegree, setRotateDegree] = useState(360);
	const [durationSpeed, setDurationSpeed] = useState(10);
	const [clicksOnImage, setClicksOnImage] = useState(0);
	const [imgScope, animateImg] = useAnimate();
	const {
		data: songData,
		isLoading,
		isError,
	} = useQuery(
		"songInfo",
		async () => {
			const res = await fetch(`${API_URL}/getCurrentTrack.php`);
			return res.json() as Promise<CurrentPlayback>;
		},
		{ refetchInterval: 10000, refetchIntervalInBackground: true },
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSongProgress((prevProgress) => (prevProgress + 1) % 100);
		}, 1550);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (!songData?.is_playing || !imgScope.current) return;
		animateImg(imgScope.current, { scale: 0.9 });
		setTimeout(() => {
			animateImg(imgScope.current, { scale: 1 });
		}, 50);

		if (clicksOnImage >= 5) {
			setDurationSpeed(5);
			setRotateDegree(6979);
			const imgSpinTimeout = setTimeout(() => {
				setDurationSpeed(10);
				setRotateDegree(360);
				setClicksOnImage(0);
			}, 1500);
			return () => clearTimeout(imgSpinTimeout);
		}
	}, [clicksOnImage]);

	useEffect(() => {
		if (isLoading || songData?.is_playing === false) return;
		setSongProgress((songData?.progress_ms / songData?.item?.duration_ms) * 100 || 0);
	}, [songData]);

	useEffect(() => {
		if (isLoading || songData?.is_playing === false) return;
		if (!isDrawerOpen) return;

		animate(drawerPlaceholder.current, { x: 0, y: 0, display: "block", opacity: 1 });
	}, [isDrawerOpen]);

	if (isLoading || songData?.is_playing === false) {
		return null;
	}

	if (isError || !songData) {
		return null;
	}

	console.log({ songData });

	const { item: song } = songData;

	function songArtistsList(artists: Artist[]) {
		return artists.map((artist, idx: number) => (
			<span key={artist.id}>
				{artist.name}
				{idx >= artists.length - 1 ? "" : ", "}
			</span>
		));
	}

	function songLength() {
		const minutes = Math.floor(song.duration_ms / 60000);
		const seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
	}

	function formatTime(progress: number) {
		const minutes = Math.floor(progress / 60000);
		const seconds = ((progress % 60000) / 1000).toFixed(0);
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
	}

	return (
		<AnimatePresence>
			<Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
				<motion.div
					ref={drawerPlaceholder}
					initial={{ bottom: "0", opacity: 1 }}
					animate={{ bottom: "-50%", display: "block", opacity: "1" }}
					transition={{ duration: 1 }}
					exit={{ bottom: "0", opacity: 1 }}
				>
					<DrawerTrigger
						className={`flex justify-center w-full h-[50px] align-bottom rounded-t-[10px] bg-background border border-b-0  transition-all `}
						onTouchStart={() => setIsDrawerOpen(!isDrawerOpen)}
					>
						<div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
						{/* <div className={`transition-all   ${isDrawerOpen ? "opacity-0" : "opacity-100"}`}>test</div> */}
						{/* <div className="w-full bg-red-400" onClick={() => test?.current}>test</div> */}
					</DrawerTrigger>
				</motion.div>
				<DrawerContent>
					<div className="w-full max-w-sm mx-auto">
						<DrawerHeader>
							<div className="flex w-full space-x-5 text-left">
								<div className="w-24 h-24">
									<motion.img
										src={song.album.images[0].url}
										onClick={() => setClicksOnImage((prev) => prev + 1)}
										alt="album"
										ref={imgScope}
										className="rounded-full"
										animate={{ rotate: songData.is_playing ? rotateDegree : 0 }}
										transition={{ duration: durationSpeed, repeat: Infinity, ease: "linear" }}
									/>
								</div>
								<div className="w-full pt-2">
									<a href={song.external_urls.spotify} target="_blank">
										<DrawerTitle>{song.name}</DrawerTitle>
										<DrawerDescription>{songArtistsList(song.artists)}</DrawerDescription>
									</a>
								</div>
							</div>

							<div className="">
								<div className="relative ">
									<div className="absolute w-full h-1 bg-current rounded-full"></div>
									<div
										className="absolute w-full h-1 rounded-full bg-primary "
										style={{ width: `${songProgress}%` }}
									></div>
								</div>
								<div className="flex items-center justify-between mt-1">
									<p className="text-sm font-bold ">{formatTime((songProgress * song.duration_ms) / 100)}</p>
									<p className="text-sm font-bold ">{songLength()}</p>
								</div>
							</div>
						</DrawerHeader>
						<DrawerFooter>
							{/* <Button>Submit</Button> */}
							{/* <DrawerClose>
							<Button>Close</Button>
						</DrawerClose> */}
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</AnimatePresence>
	);
};
export default SongDrawer;
