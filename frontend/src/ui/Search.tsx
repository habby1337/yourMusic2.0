import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const SearchModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="h-screen w-screen absolute z-10 top-0 left-0 bg-neutral-900 p-5 space-y-5"
					// animate sliding from left to right
					initial={{ x: "-100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.1 }}
					// when the modal is closed animate sliding from right to left
					exit={{ x: "-100%", opacity: 0 }}
				>
					<ArrowLeft size={30} strokeWidth={3} onClick={() => handleClose()} />
					<h1 className="text-3xl font-bold">Search</h1>

					<Input
						placeholder="Search for songs"
						className="rounded-full dark:bg-neutral-800 border-0 placeholder:text-neutral-400"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
