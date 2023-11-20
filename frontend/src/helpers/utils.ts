import toast from "react-hot-toast";
import { API_URL } from "./endpoints";
import { track } from "./types";

export const generateRandomString = (length: number): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; ++i) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const handleAddToQueue = (trackUri: track["uri"]) => {
	const res = fetch(`${API_URL}/addQueue.php?q=${trackUri}`);

	toast.promise(res, {
		loading: "Adding to queue",
		success: "Added to queue",
		error: "Something went wrong",
	});
};
