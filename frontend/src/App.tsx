import "./App.css";

import { API_URL } from "./helpers/endpoints";

import { useParams } from "react-router-dom";
import Navigation from "./ui/Navigation";
import Search from "./ui/Search";
import Discover from "./ui/Discover";
import Player from "./ui/Player";

function App() {
	return (
		<div className="container p-4 pt-6">
			<Navigation />
			<Search />
			<Discover />
			<Player />
		</div>
	);
}

export default App;
