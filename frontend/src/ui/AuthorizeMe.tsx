import { ThemeProvider } from "@/components/theme-provider";
import { Spotlight } from "@/components/ui/Spotlight";
import { API_URL } from "@/helpers/endpoints";
import { Link } from "react-router-dom";
export const AuthorizeMe = () => {
	return (
		<ThemeProvider defaultTheme="light" storageKey="ym-ui-theme">
			<div className="h-screen w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-dot-green-400/[0.3] relative overflow-hidden">
				<Spotlight className="top-36 left-10" fill="white" />
				<div className="">
					<Link className="" to={`${API_URL}/auth.php`}>
						Login with Spotify
					</Link>
				</div>
			</div>
		</ThemeProvider>
	);
};
