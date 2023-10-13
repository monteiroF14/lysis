import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<main className="bg-zinc-900">
			<h1 className="text-red-700">lysis</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
			</div>
		</main>
	);
}

export default App;
