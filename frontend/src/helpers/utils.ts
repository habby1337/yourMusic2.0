import toast from "react-hot-toast";
import { API_URL } from "./endpoints";
import { track } from "./types";
import { rateLimit } from "rate-limiter-fn";

export const generateRandomString = (length: number): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; ++i) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
const addToQueue = (trackUri: track["uri"]) => {
	const res = fetch(`${API_URL}/addQueue.php?q=${trackUri}`);
	toast.promise(res, {
		loading: "Adding song to queue...",
		success: "Song added to queue!",
		error: "Error adding song to queue!",
	});
};

const rateLimitPromise = rateLimit(addToQueue, {
	limit: 1,
	interval: 5000,
	onLimitReached: () => toast.error("Chill out!\n You can add one song every 5 seconds!", { icon: "🤬" }),
});

// create a ratelimiter, if the function is called more than once in the given time, it will return false
export const handleAddToQueue = async (trackUri: track["uri"]) => {
	rateLimitPromise(trackUri);
};

export const capitalizeString = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
