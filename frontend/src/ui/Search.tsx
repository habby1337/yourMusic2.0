import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, forwardRef, Ref } from "react";
import { MailWarning, Music, Plus, ServerOff, XCircle, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "react-query";
import { API_URL } from "@/helpers/endpoints";
import { TrackSearchResult, Track, Artist } from "@/helpers/types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { handleAddToQueue } from "@/helpers/utils";

const SearchForm = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="mt-5">
			<Input
				placeholder="Search for songs"
				className="border-0 rounded-full bg-secondary"
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

	const { isLoading, error, data, isError } = useQuery(
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
		<div className="z-50">
			<AnimatePresence>
				{show && (
					<motion.div
						className="absolute top-0 left-0 z-10 w-screen h-screen p-5 space-y-5 bg-neutral-50 dark:bg-neutral-900"
						initial={{ x: "-100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.1 }}
						exit={{ x: "-100%", opacity: 0 }}
					>
						<div className="flex space-x-1 align-baseline">
							<ChevronLeft strokeWidth={2} onClick={() => closeSearchMenu()} size="30" className="text-3xl" />
							<motion.h1 className={`text-2xl `}>Search</motion.h1>
						</div>

						<motion.div
							// onFocus={() => setIsInputFocused(true)}
							// onBlur={() => setIsInputFocused(false)}
							className="relative"
							initial={{ y: 0, opacity: 1, scale: 1 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.2 }}
						>
							<Input
								placeholder="Search for songs"
								className="bg-gray-200 border-0 rounded-full dark:bg-neutral-800 dark:placeholder:text-zinc-400"
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

						<ResultTrackList data={data} isLoading={isLoading} error={error as Error} isError={isError} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const ResultTrackList = ({
	data,
	isLoading,
	error,
	isError,
}: {
	data: TrackSearchResult;
	isLoading: boolean;
	error: Error;
	isError: boolean;
}) => {
	// console.log("error", error, isError);
	// isError = true;
	// error = "TypeError: NetworkError when attempting to fetch resource.";
	if (isError) {
		return (
			<div className="z-10 flex flex-col items-center justify-center mt-16 text-center h-1/2 text-zinc-800 dark:text-neutral-400">
				<ServerOff
					size={60}
					strokeWidth={2}
					className="mb-4 text-zinc-800 dark:text-neutral-300 opacity-30 mix-blend-exclusion"
				/>
				<p className="font-medium">The server might be sleeping at this moment... </p>

				<p className="text-neutral-600">try again later...</p>

				<div className="flex items-center mt-40 space-x-1 font-mono text-zinc-800 dark:text-neutral-300 opacity-20 mix-blend-exclusion">
					<MailWarning size={30} strokeWidth={1} />
					<p className="">{error.message}</p>
					<MailWarning size={30} strokeWidth={1} />
				</div>
			</div>
		);
	}
	if (!data?.tracks && !isLoading) {
		return (
			<div style={{ zIndex: 9999 }} className="flex flex-col items-center justify-center text-center h-1/2">
				<Music size={60} strokeWidth={2} className="mb-4 dark:text-neutral-300 text-zinc-800 opacity-30 " />
				<p className="text-2xl font-semibold text-zinc-800 dark:text-neutral-300 opacity-20 ">Start typing to search</p>
			</div>
		);
	}

	if (isLoading) {
		return <ResultTrackListSkeleton number={7} />;
	}

	if (data?.tracks?.items.length === 0) {
		return <div>No results found</div>;
	}

	if (data?.tracks) {
		return (
			<div className="space-y-2 overflow-y-scroll max-h-[75vh]">
				{data.tracks.items.map((item: Track) => (
					<ResultTrackItem key={item.id} item={item} />
				))}
			</div>
		);
	}
};

export const ResultTrackListSkeleton = ({ number }: { number: number }) => {
	return (
		<div className="space-y-2 overflow-y-scroll max-h-[75vh] opacity-50">
			<SkeletonTheme baseColor="#b8b8b8" highlightColor="#d4d4d4">
				{[...Array(number)].map((item, index) => (
					<div className="flex items-center p-1 space-x-2 bg-transparent rounded-xl" key={index}>
						<div className="relative w-12 min-w-[3rem]" key={item}>
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

export const ResultTrackItem = forwardRef(({ item }: { item: Track }, ref: Ref<HTMLDivElement>) => {
	const [isHovered, setIsHovered] = useState(false);

	const controls = useAnimation();
	const trackRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(trackRef);

	useEffect(() => {
		if (isInView) {
			controls.start({ opacity: 1, y: 0 });
		}
	}, [isInView]);

	return (
		<motion.div
			ref={trackRef}
			initial={{ opacity: 0, y: 10 }}
			animate={controls}
			transition={{
				duration: 0.3,
				delay: 0.1,
				type: "spring",
				bounce: 0.3,
				stiffness: 100,
				damping: 10,
				mass: 0.5,
				velocity: 0,
			}}
		>
			<div
				ref={ref}
				className={` flex items-center space-x-2 ${isHovered ? "bg-neutral-800" : "bg-transparent"} p-1 rounded-xl`}
				onMouseOver={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => handleAddToQueue(item.uri)}
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
					<p className="text-sm">{item.artists.map((artist: Artist) => artist.name).join(", ")}</p>
				</div>
			</div>
		</motion.div>
	);
});
