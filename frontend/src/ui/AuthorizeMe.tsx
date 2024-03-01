import { ThemeProvider } from "@/components/theme-provider";
import { Spotlight } from "@/components/ui/Spotlight";
import { API_URL } from "@/helpers/endpoints";
import { Link } from "react-router-dom";
export const AuthorizeMe = () => {
	return (
		<ThemeProvider defaultTheme="light" storageKey="ym-ui-theme">
			<div className="w-screen h-screen p-0 bg-black/[0.96] antialiased justify-center items-center text-center bg-dot-green-400/[0.3] relative overflow-hidden flex">
				<div>
					<div className="">
						<h1 className="text-4xl font-bold text-white">Authorize Me</h1>
						<p className="text-slate-400">Authorize your Spotify account to continue</p>
					</div>
					<div className="mt-5">
						<Spotlight className="top-32 left-4 md:-top-36 md:left-96" fill="white" />
						<div className="">
							<Link className="" to={`${API_URL}/auth.php`}>
								<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1DB954,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
									Login with Spotify
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};
