import { Input } from "@/components/ui/input";

const Search = () => {
	return (
		<div className="mt-5">
			<Input
				placeholder="Search for songs"
				className="rounded-full dark:bg-neutral-800 border-0 placeholder:text-neutral-400"
			/>
		</div>
	);
};

export default Search;
