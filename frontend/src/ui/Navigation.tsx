import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/helpers/endpoints";
import { UserResponse } from "@/helpers/types";
import { useQuery } from "react-query";
import { ModeToggle } from "@/components/mode-toggle";
const Navigation = () => {
	const { data, isLoading } = useQuery(
		"user",
		async () => {
			const res = await fetch(`${API_URL}/getUserInfo.php`);
			return res.json() as Promise<UserResponse>;
		},
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchInterval: false,
			refetchIntervalInBackground: false,
		},
	);

	// useEffect(() => {
	// 	if (isError) return;
	// 	console.log({ data });
	// }, [data]);

	return (
		<div className="flex justify-around">
			<div className="flex gap-2 text-left">
				<a href={data?.external_urls.spotify || "/authorizeMe"} target="_blank" className="relative">
					{data?.product === "premium" && (
						<div className="absolute z-10 -left-4 ">
							<div className="text-[10px] text-green-500 -rotate-45 font-extrabold dark:bg-neutral-900 bg-neutral-50  rounded-sm p-[1px]">
								Premium
							</div>
						</div>
					)}

					<Avatar className="w-12 h-12">
						<AvatarImage src={imageThumbnail(data, isLoading)} />
						<AvatarFallback>YM2.0</AvatarFallback>
					</Avatar>
				</a>
				<div>
					Welcome to YourMusic 2.0, <br />{" "}
					<span className="text-muted-foreground">
						Adding songs to{" "}
						<span className="font-bold ">
							<Username data={data} isLoading={isLoading} />
						</span>
						's queue.
					</span>
				</div>
			</div>
			<div className="flex text-right">
				<ModeToggle />
			</div>
		</div>
	);
};

const imageThumbnail = (data: UserResponse | undefined, isLoading: boolean) => {
	const placeholderImageUrl =
		"https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo-thumbnail.png";
	if (isLoading) return placeholderImageUrl;
	if (data === undefined) return placeholderImageUrl;
	if (data?.images[0]?.url) return data.images[0].url;
	return placeholderImageUrl;
};

const Username = ({ data, isLoading }: { data: UserResponse | undefined; isLoading: boolean }) => {
	const placeholderText = "the coolest dude ever";

	if (isLoading) return placeholderText;
	if (data === undefined) return placeholderText;
	if (data?.id) return data.id;
	if (data?.display_name) return data.display_name;
	return placeholderText;
};

export default Navigation;
