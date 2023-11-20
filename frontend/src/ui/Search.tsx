import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, forwardRef, Ref } from "react";
import { ArrowLeft, Plus, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "react-query";
import { API_URL } from "@/helpers/endpoints";
import { trackSearchResult, track } from "@/helpers/types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import toast from "react-hot-toast";

const SearchForm = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="mt-5">
			<Input
				placeholder="Search for songs"
				className="rounded-full dark:bg-neutral-800 border-0 placeholder:text-neutral-400"
				readOnly={true}
				onClick={() => setShowModal(true)}
			/>
			<SearchModal show={showModal} handleClose={() => setShowModal(false)} />
		</div>
	);
};

export default SearchForm;

const SearchModal = ({
	show,
	handleClose,
	defaultValue,
}: {
	show: boolean;
	handleClose: () => void;
	defaultValue?: string;
}) => {
	const [value, setValue] = useState(defaultValue);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (show) {
			inputRef.current?.focus();
		}
	}, [show]);

	const debounced = useDebouncedCallback(
		(value) => {
			setValue(value);
		},
		1000,
		{ maxWait: 2000, leading: false },
	);

	const { isLoading, error, data } = useQuery(
		["trackSearch", value],
		async () => {
			const res = await fetch(`${API_URL}/getSearchInfo.php?q=${value}`);

			return res.json();
		},
		{ enabled: !!value, refetchOnWindowFocus: false },
	);

	const closeSearchMenu = () => {
		handleClose();
		setValue("");
		inputRef.current!.value = "";
	};

	return (
		<>
			<AnimatePresence>
				{show && (
					<motion.div
						className="h-screen w-screen absolute z-10 top-0 left-0 bg-neutral-900 p-5 space-y-5"
						initial={{ x: "-100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.1 }}
					>
						<ArrowLeft size={30} strokeWidth={3} onClick={() => closeSearchMenu()} />
						<motion.h1 className={`text-3xl font-bold ${isInputFocused ? "hidden" : ""}`}>Search</motion.h1>
						<motion.div
							// onFocus={() => setIsInputFocused(true)}
							// onBlur={() => setIsInputFocused(false)}
							className="relative"
							initial={{ y: 0, opacity: 1, scale: 1 }}
							animate={isInputFocused ? { y: -5, opacity: 0.8, scale: 0.95 } : { opacity: 1, scale: 1 }}
							transition={{ duration: 0.2 }}
						>
							<Input
								placeholder="Search for songs"
								className="rounded-full dark:bg-neutral-800 border-0 placeholder:text-neutral-400"
								defaultValue={defaultValue}
								onChange={(e) => debounced(e.target.value)}
								ref={inputRef}
							/>
							{/* <p>Debounced value: {value}</p> */}
							{/* {isInputFocused && ( */}
							<button
								className=" absolute top-[10px] right-2"
								onMouseDown={(e) => {
									e.preventDefault();
									setValue("");
									inputRef.current!.value = "";
									inputRef.current?.focus();
								}}
							>
								<XCircle size={20} strokeWidth={3} />
							</button>
							{/* )} */}
						</motion.div>
						<ResultTrackList data={data} isLoading={isLoading} error={error} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

const ResultTrackList = ({ data, isLoading, error }: { data: trackSearchResult; isLoading: boolean; error: any }) => {
	if (!data?.tracks && !isLoading) {
		return (
			<div className="flex justify-center items-center text-center h-1/2">
				<p className="text-neutral-300 text-4xl opacity-10 font-extrabold mix-blend-exclusion ">
					Start typing to get results
				</p>
			</div>
		);
	}

	if (isLoading) {
		return <ResultTrackListSkeleton number={5} />;
	}

	if (error) {
		return <div>Error: </div>;
	}

	if (data?.tracks?.items.length === 0) {
		return <div>No results found</div>;
	}

	if (data?.tracks) {
		return (
			<div className="space-y-2 overflow-scroll max-h-[75vh]">
				{data.tracks.items.map((item) => (
					<ResultTrackItem key={item.id} item={item} />
				))}
			</div>
		);
	}
};

export const ResultTrackListSkeleton = ({ number }: { number: number }) => {
	return (
		<div className="space-y-2 overflow-scroll max-h-[75vh]">
			<SkeletonTheme baseColor="#202020" highlightColor="#444">
				{[...Array(number)].map((item) => (
					<div className="flex items-center space-x-2 bg-transparent p-1 rounded-xl" key={item}>
						<div className="relative w-12 min-w-[3rem]">
							<Skeleton circle={true} width={48} height={48} enableAnimation />
						</div>
						<div className="flex flex-col ">
							<Skeleton width={250} enableAnimation />
							<Skeleton width={150} enableAnimation />
						</div>
					</div>
				))}
			</SkeletonTheme>
		</div>
	);
};

export const ResultTrackItem = forwardRef(({ item }: { item: track }, ref: Ref<HTMLDivElement>) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleAddToQueue = (item: track) => {
		// refetch();
		const res = fetch(`${API_URL}/addQueue.php?q=${item.uri}`);

		toast.promise(res, {
			loading: "Adding to queue",
			success: "Added to queue",
			error: "Something went wrong",
		});

		console.log(item);
	};

	return (
		<div
			ref={ref}
			className={` flex items-center space-x-2 ${isHovered ? "bg-neutral-800" : "bg-transparent"} p-1 rounded-xl`}
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleAddToQueue(item)}
		>
			<div className="relative w-12 min-w-[3rem]">
				<div
					className={`${
						isHovered ? "opacity-100" : "opacity-0"
					} absolute transition-all h-12 w-12 flex   justify-center items-center bg-neutral-600 bg-opacity-70 backdrop-blur-[1px] rounded-full`}
				>
					<Plus size={20} strokeWidth={3} />
				</div>

				<img src={item.album.images[0].url} alt="" className="w-12 h-12 rounded-full" />
			</div>
			<div className="flex flex-col ">
				<p className="font-bold">{item.name}</p>
				<p className="text-sm">{item.artists.map((artist) => artist.name).join(", ")}</p>
			</div>
		</div>
	);
});
