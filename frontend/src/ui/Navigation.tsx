import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
	return (
		<div className="flex text-left gap-2">
			<div>
				<Avatar className="h-12 w-12">
					<AvatarImage src="https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo-thumbnail.png" />
					<AvatarFallback>YM2.0</AvatarFallback>
				</Avatar>
			</div>
			<div>
				Hello, <br /> Welcome to YourMusic 2.0
			</div>
		</div>
	);
};

export default Navigation;
