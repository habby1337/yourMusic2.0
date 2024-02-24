import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
const SongDrawer = () => {
	return <SongCard />;
};

const SongCard = () => {
	return (
		<Drawer>
			<DrawerTrigger className="sticky bottom-0 flex justify-center w-full h-10" asChild>
				<div className="w-full bg-red-400">test</div>
			</DrawerTrigger>
			<DrawerContent>
				<div className="w-full max-w-sm mx-auto">
					<DrawerHeader>
						<DrawerTitle>Song title</DrawerTitle>
						<DrawerDescription>Artist name</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose>
							<Button>Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
export default SongDrawer;
