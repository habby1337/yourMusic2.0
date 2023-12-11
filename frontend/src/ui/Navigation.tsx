import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/helpers/endpoints";
import { userResponse } from "@/helpers/types";
import { useQuery } from "react-query";
const Navigation = () => {
	const { data, isLoading } = useQuery(
		"user",
		async () => {
			const res = await fetch(`${API_URL}/getUserInfo.php`);
			return res.json() as Promise<userResponse>;
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
		<div className="flex gap-2 text-left">
			<a href={data?.external_urls.spotify} target="_blank">
				{data?.product === "premium" && (
					<div className="absolute left-0 z-20 top-3 ">
						<div className="text-[10px] text-green-500 -rotate-45 font-extrabold bg-neutral-900  rounded-sm p-[1px]">
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
				<span className="text-neutral-400">
					You're adding songs to{" "}
					<span className="font-bold shine">
						<Username data={data} isLoading={isLoading} />
					</span>
					's queue.
				</span>
			</div>
		</div>
	);
};

const imageThumbnail = (data: userResponse | undefined, isLoading: boolean) => {
	const placeholderImageUrl =
		"https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo-thumbnail.png";
	if (isLoading) return placeholderImageUrl;
	if (data === undefined) return placeholderImageUrl;
	if (data?.images[0]?.url) return data.images[0].url;
	return placeholderImageUrl;
};

const Username = ({ data, isLoading }: { data: userResponse | undefined; isLoading: boolean }) => {
	const placeholderText = "the coolest dude ever";

	if (isLoading) return placeholderText;
	if (data === undefined) return placeholderText;
	if (data?.id) return data.id;
	if (data?.display_name) return data.display_name;
	return placeholderText;
};

export default Navigation;
