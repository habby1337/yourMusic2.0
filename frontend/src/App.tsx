import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { API_URL } from "./helpers/endpoints";

function App() {
	const [count, setCount] = useState(0);
	const sendRequestTest = async () => {
		const response = await fetch(`${API_URL}/getCurrentTrack.php`);
		const data = await response.json();
		console.log(data);
	};
	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<a className="button" href={`${API_URL}/auth.php`}>
					GO LOGIN
				</a>
				<button onClick={sendRequestTest}>send request</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
