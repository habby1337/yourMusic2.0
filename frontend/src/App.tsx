import "./App.css";

import Navigation from "./ui/Navigation";
import SearchForm from "./ui/Search";
import Discover from "./ui/Discover";
import Player from "./ui/Player";
import Suggestions from "./ui/Suggestions";

function App() {
	return (
		<div className="container w-screen h-screen p-4 overflow-x-hidden">
			<Navigation />
			<SearchForm />
			<Discover />
			<Suggestions />
			<Player />
		</div>
	);
}

export default App;
