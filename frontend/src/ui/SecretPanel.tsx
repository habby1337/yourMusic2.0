import usePlayerStore from "@/components/store/playerStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklesCore } from "@/components/ui/sparkles";
import { Tabs } from "@/components/ui/tabs";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { API_URL } from "@/helpers/endpoints";
import { Play, Send, SendHorizonal, SendHorizontal, SkipBack, SkipForward, Square } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDebouncedCallback } from "use-debounce";

const getVolume = async () => {
	const res = await fetch(`${API_URL}/getVolume.php`);
	return res.json();
};

const sendVolumeToBackend = async (volume: number) => {
	const res = await fetch(`${API_URL}/setVolume.php?v=${volume}`);
	return res.json();
};

export const SecretPanel = () => {
	const iconSettings = {
		size: 32,
		strokeWidth: 1.5,
	};

	const iconClasses = "text-white hover:text-orange-300 transition-colors duration-200";

	const notify = () => toast.success("🦄 Sent!");

	const stopPlayer = async () => {
		await fetch(`${API_URL}/sendStop.php`);
		notify();
	};
	const sendPlay = async () => {
		await fetch(`${API_URL}/sendPlay.php`);
		notify();
	};

	const sendBackward = async () => {
		await fetch(`${API_URL}/sendBackward.php`);
		notify();
	};

	const sendForward = async () => {
		await fetch(`${API_URL}/sendForward.php`);
		notify();
	};

	// return a random emoji from the list
	const words = [
		{
			text: "Is...",
		},
		{
			text: "is...",
		},
		{
			text: "this",
		},
		{
			text: "a",
		},
		{
			text: "secret",
			className: " ",
		},
		{
			text: "panel?",
		},
	];

	return (
		<div className="h-screen relative w-full bg-gray-950  overflow-hidden rounded-md">
			<div className="w-full absolute inset-0 h-screen">
				<SparklesCore
					id="sparkles"
					background="transparent"
					minSize={0.6}
					maxSize={1.4}
					particleDensity={100}
					className="w-full h-full"
					particleColor="#ffffff"
				/>
			</div>
			{/* <h1 className="text-3xl font-bold text-center text-white relative z-20">Build this cool pannel</h1> */}
			<div className="p-4">
				<TypewriterEffect words={words} cursorClassName="h-5" className="font-normal text-2xl" />

				<TabsSettings />
			</div>
		</div>
		// <div className="w-screen h-screen mx-auto ">
		// 	<div className="p-4 text-center">
		// 		<span className="text-2xl"></span>
		// 		<h1 className="text-2xl font-bold rainbow rainbow-text-animated">Is this... is this a secret panel? </h1>
		// 	</div>

		// 	<div className="mt-16 mb-4">
		// 		<p className="text-2xl text-center">🎵 Playback Control 🎵</p>
		// 	</div>
		// 	<div className="flex justify-center space-x-2">
		// 		<button
		// 			onClick={sendBackward}
		// 			className="flex-initial border rounded-lg border-neutral-600 hover:border-orange-500"
		// 		>
		// 			<SkipBack {...iconSettings} className={iconClasses} />
		// 		</button>
		// 		<button onClick={stopPlayer} className="border rounded-lg border-neutral-600 hover:border-orange-500">
		// 			<Square {...iconSettings} className={iconClasses} />
		// 		</button>
		// 		<button onClick={sendPlay} className="border rounded-lg border-neutral-600 hover:border-orange-500">
		// 			<Play {...iconSettings} className={iconClasses} />
		// 		</button>

		// 		<button onClick={sendForward} className="border rounded-lg border-neutral-600 hover:border-orange-500">
		// 			<SkipForward {...iconSettings} className={iconClasses} />
		// 		</button>
		// 	</div>

		// 	<div>
		// 		<VolumeSlider />
		// 	</div>
		// </div>
	);
};

const TabsSettings = () => {
	const tabClassName =
		"bw-full overflow-hidden relative h-full rounded-2xl p-2 text-xl md:text-4xl font-bold text-white bg-opacity-50 bg-gradient-to-br from-slate-800 to-slate-900";
	const tabs = [
		{
			title: "Playback",
			value: "playback",
			content: (
				<div className={tabClassName}>
					{/* <h1>Playback</h1> */}
					<PlaybackControls />
				</div>
			),
		},
		{
			title: "Volume",
			value: "volume",
			content: (
				<div className={tabClassName}>
					<VolumeControls />
				</div>
			),
		},
		{
			title: "General",
			value: "general",
			content: (
				<div className={tabClassName}>
					<GeneralControls />
				</div>
			),
		},
	];

	return (
		<div className=" h-[40rem]  [perspective:1000px] relative  max-w-5xl mx-auto w-full items-center justify-center my-5 ">
			<Tabs
				tabs={tabs}
				containerClassName="bg-opacity-50 justify-center"
				contentClassName="bg-opacity-50"
				activeTabClassName="dark:bg-slate-800"
				// tabClassName="bg-slate-800"
				// tabClassName="justify-content-center flex"
			/>
		</div>
	);
};

export const ACTIONS = {
	PLAY: "sendPlay",
	STOP: "sendStop",
	SKIP_BACK: "sendBackward",
	SKIP_FORWARD: "sendForward",
	SET_VOLUME: "setVolume",
	GET_VOLUME: "getVolume",
} as const;

interface Action {
	type: keyof typeof ACTIONS;
	options?: {
		[key: string]: string;
	};
}

const PlaybackControls = () => {
	const [playbackState, setPlaybackState] = useState<keyof typeof ACTIONS>("STOP");
	const isPlaying = usePlayerStore((state) => state.isPlaying);
	const sendAction = async (action: Action) => {
		switch (action.type) {
			case "SET_VOLUME":
				await fetch(`${API_URL}/${ACTIONS[action.type]}.php?v=${action.options?.volume}`);
				break;
			default:
				await fetch(`${API_URL}/${ACTIONS[action.type]}.php`);
				break;
		}
	};

	useEffect(() => {
		console.log({ isPlaying });
		if (isPlaying || playbackState === "PLAY") {
			setPlaybackState("PLAY");
		} else {
			setPlaybackState("STOP");
		}
	}, [isPlaying, playbackState]);

	return (
		<div className="p-0 items-center text-center space-y-5  justify-center">
			<div>
				<h2 className="text-xl p-2">Playback</h2>

				<div className="space-x-2 inline-flex">
					<Button onClick={() => sendAction({ type: "SKIP_BACK" })}>
						<SkipBack />
					</Button>
					{playbackState === "STOP" ? (
						<Button
							onClick={() => {
								sendAction({ type: "PLAY" });
								setPlaybackState("PLAY");
							}}
						>
							<Play />
						</Button>
					) : (
						<Button
							onClick={() => {
								sendAction({ type: "STOP" });
								setPlaybackState("STOP");
							}}
						>
							<Square />
						</Button>
					)}
					<Button onClick={() => sendAction({ type: "SKIP_FORWARD" })}>
						<SkipForward />
					</Button>
				</div>
			</div>
			<div>
				<h2 className="text-xl p-2">Play song</h2>
				<div>
					<TrackInput />
				</div>
			</div>
		</div>
	);
};

const TrackInput = () => {
	const [track, setTrack] = useState("");
	return (
		<div className="flex space-x-2 h-30">
			{/* create an input that holds a track */}
			<Input
				type="text"
				placeholder="spotify:track:7lEptt4wbM0yJTvSG5EBof"
				value={track}
				onChange={(e) => setTrack(e.target.value)}
				className="w-5/6 h-full"
			/>
			<Button className="w-1/6 h-full ">
				<Send size={20} strokeWidth={0.88888888} />
			</Button>
		</div>
	);
};

const VolumeControls = () => {
	return <h1>Volume</h1>;
};
const GeneralControls = () => {
	return <h1>General</h1>;
};
// const VolumeSlider = () => {
// 	// const { isLoading, error, data, isError } = useQuery(["getVolume", newVolume], getVolume, {})
// 	const [volume, setVolume] = useState(0);
// 	const [newVolume, setNewVolume] = useState(0);
// 	const debouncedVolume = useDebouncedCallback(
// 		(volume) => {
// 			sendVolumeToBackend(volume);
// 		},
// 		1000,
// 		{ leading: true },
// 	);

// 		refetchInterval: 5000,
// 	});

// 	useEffect(() => {
// 		if (getVolumeData) {
// 			setVolume(getVolumeData);
// 			setNewVolume(getVolumeData);
// 		}
// 	}, [getVolumeData]);

// 	useEffect(() => {
// 		if (newVolume !== volume) {
// 			debouncedVolume(newVolume);
// 		}
// 	}, [newVolume]);

// 	const rainbowColor = (value: number) => {
// 		const hue = (value / 100) * 360;
// 		return `hsl(${hue}, 100%, 50%)`;
// 	};

// 	return (
// 		<div className="mt-16 text-center ">
// 			<p className="mb-4 text-2xl">🔇 Volume Control 🔊</p>
// 			<div className="relative flex items-center justify-center gap-2 ">
// 				<span className="text-lg">🔇</span>
// 				<input
// 					className="h-4 rounded-lg appearance-none w-96"
// 					type="range"
// 					min="0"
// 					max="100"
// 					step="1"
// 					value={newVolume}
// 					onChange={(e) => setNewVolume(parseInt(e.target.value))}
// 					style={{
// 						background: `linear-gradient(to right, ${rainbowColor(15)} 0%, ${rainbowColor(newVolume)} 100%)`,
// 					}}
// 				/>
// 				<span className="text-lg">{newVolume}</span>
// 			</div>
// 		</div>
// 	);
// };
