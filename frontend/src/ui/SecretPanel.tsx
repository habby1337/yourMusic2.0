import { API_URL } from "@/helpers/endpoints";
import { Play, SkipBack, SkipForward, Square } from "lucide-react";
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

	return (
		<div className="w-screen h-screen mx-auto ">
			<div className="p-4 text-center">
				<span className="text-2xl"></span>
				<h1 className="text-2xl font-bold rainbow rainbow-text-animated">Is this... is this a secret panel? </h1>
			</div>

			<div className="mt-16 mb-4">
				<p className="text-2xl text-center">🎵 Playback Control 🎵</p>
			</div>
			<div className="flex justify-center space-x-2">
				<button
					onClick={sendBackward}
					className="flex-initial border rounded-lg border-neutral-600 hover:border-orange-500"
				>
					<SkipBack {...iconSettings} className={iconClasses} />
				</button>
				<button onClick={stopPlayer} className="border rounded-lg border-neutral-600 hover:border-orange-500">
					<Square {...iconSettings} className={iconClasses} />
				</button>
				<button onClick={sendPlay} className="border rounded-lg border-neutral-600 hover:border-orange-500">
					<Play {...iconSettings} className={iconClasses} />
				</button>

				<button onClick={sendForward} className="border rounded-lg border-neutral-600 hover:border-orange-500">
					<SkipForward {...iconSettings} className={iconClasses} />
				</button>
			</div>

			<div>
				<VolumeSlider />
			</div>
		</div>
	);
};

const VolumeSlider = () => {
	// const { isLoading, error, data, isError } = useQuery(["getVolume", newVolume], getVolume, {})
	const [volume, setVolume] = useState(0);
	const [newVolume, setNewVolume] = useState(0);
	const debouncedVolume = useDebouncedCallback(
		(volume) => {
			sendVolumeToBackend(volume);
		},
		1000,
		{ leading: true },
	);

	const { data: getVolumeData } = useQuery(["getVolume", volume], getVolume, {
		refetchInterval: 5000,
	});

	useEffect(() => {
		if (getVolumeData) {
			setVolume(getVolumeData);
			setNewVolume(getVolumeData);
		}
	}, [getVolumeData]);

	useEffect(() => {
		if (newVolume !== volume) {
			debouncedVolume(newVolume);
		}
	}, [newVolume]);

	const rainbowColor = (value: number) => {
		const hue = (value / 100) * 360;
		return `hsl(${hue}, 100%, 50%)`;
	};

	return (
		<div className="mt-16 text-center ">
			<p className="mb-4 text-2xl">🔇 Volume Control 🔊</p>
			<div className="relative flex items-center justify-center gap-2 ">
				<span className="text-lg">🔇</span>
				<input
					className="h-4 rounded-lg appearance-none w-96"
					type="range"
					min="0"
					max="100"
					step="1"
					value={newVolume}
					onChange={(e) => setNewVolume(parseInt(e.target.value))}
					style={{
						background: `linear-gradient(to right, ${rainbowColor(15)} 0%, ${rainbowColor(newVolume)} 100%)`,
					}}
				/>
				<span className="text-lg">{newVolume}</span>
			</div>
		</div>
	);
};
