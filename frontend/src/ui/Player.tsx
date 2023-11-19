import { Card } from "@/components/ui/card";

const Player = () => {
	return (
		<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3  w-11/12">
			<Card className="p-3 bg-neutral-800 border-0 text-white rounded-xl  ">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<img
							src="https://seeded-session-images.scdn.co/v1/img/artist/45rVykSnbTDeLDAcguWln3/en"
							alt=""
							className="w-16 h-16 rounded-full"
						/>
						<div>
							<p className="text-sm font-bold">Blinding Lights</p>
							<p className="text-sm">The Weeknd</p>
						</div>
					</div>
				</div>
				{/* timeslider */}
				{/* <div className="flex items-center justify-between mt-3">
					<p className="text-sm font-bold">0:00</p>
					<p className="text-sm font-bold">3:00</p>
				</div>
				<div className="mt-3">
					<div className="w-full h-1 bg-neutral-700 rounded-full"></div>
					<div className="w-1/2 h-1 bg-white rounded-full"></div>
				</div> */}
			</Card>
		</div>
	);
};

export default Player;
