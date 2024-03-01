import { ThemeProvider } from "@/components/theme-provider";
import { Spotlight } from "@/components/ui/Spotlight";
import { API_URL } from "@/helpers/endpoints";
import { Link } from "react-router-dom";
export const AuthorizeMe = () => {
	return (
		<ThemeProvider defaultTheme="light" storageKey="ym-ui-theme">
			<div className="w-screen h-screen p-0 dark:bg-black/[0.96] bg-white/[0.96] bg-dot-green-400/[0.8] antialiased justify-center items-center text-center dark:bg-dot-green-400/[0.3] relative overflow-hidden flex">
				<div>
					<div className="">
						<h1 className="text-4xl font-bold dark:text-white">Authorize Me</h1>
						<p className="text-slate-400">Authorize your Spotify account to continue</p>
					</div>
					<div className="mt-5">
						<Spotlight className="top-32 left-4 md:-top-36 md:left-96" fill="white" />
						<div className="">
							<Link className="" to={`${API_URL}/auth.php`}>
								<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 dark:border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#1DB954,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1DB954,55%,#000103)] bg-[length:200%_100%] px-6 font-medium dark:text-slate-400 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
									Login with Spotify
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div>
					<Link to="/" className="absolute top-4 right-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 dark:text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</Link>
				</div>
			</div>
		</ThemeProvider>
	);
};
