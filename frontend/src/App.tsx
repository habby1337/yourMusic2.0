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
			<div className="container w-screen h-screen p-4 overflow-x-hidden">
				<Navigation />
				<SearchForm />
				<Discover />
				<Suggestions />
				{/* <SongPlayer /> */}
			</div>
			<SongDrawer />
		</ThemeProvider>
	);
}

export default App;
