import { API_URL } from "@/helpers/endpoints";
import { Play, SkipBack, SkipForward, Square } from "lucide-react";
import toast from "react-hot-toast";

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
	return (
		<div className="w-screen h-screen m-auto">
			<h1 className="p-3 text-2xl">Is... is, this a secret panel? 😮 </h1>
			<div className="flex justify-center">
				<button className="me-5">
					<SkipBack {...iconSettings} className={iconClasses} />
				</button>
				<button onClick={stopPlayer}>
					<Square {...iconSettings} className={iconClasses} />
				</button>
				<button onClick={sendPlay} className="mr-4">
					<Play {...iconSettings} className={iconClasses} />
				</button>

				<button>
					<SkipForward {...iconSettings} className={iconClasses} />
				</button>
			</div>
		</div>
	);
};
