import "./App.css";

import Navigation from "./ui/Navigation";
import SearchForm from "./ui/Search";
import Discover from "./ui/Discover";
import SongPlayer from "./ui/SongPlayer";
import Suggestions from "./ui/Suggestions";
import SongDrawer from "./ui/SongDrawer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="light" storageKey="ym-ui-theme">
			<div className="w-screen h-screen">
				<div className="p-4 overflow-x-hidden">
					<Navigation />
					<SearchForm />
					<Discover />
					<Suggestions />
				</div>

				{/* <SongPlayer /> */}

				<SongDrawer />
			</div>
		</ThemeProvider>
	);
}

export default App;
