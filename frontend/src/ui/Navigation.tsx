import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
	return (
		<div className="flex text-left gap-2">
			<div>
				<Avatar className="h-12 w-12">
					<AvatarImage src="https://www.myneonclub.com/cdn/shop/products/34d31ce7dc5d93bc4c6b3f74ff7ad29a_600x.jpg?v=1639506883" />
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
