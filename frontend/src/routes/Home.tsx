
import { Link } from "react-router-dom";
        
function Home() {
	document.title = "Lysis - The World's Greatest Website for Movies, Series & More.";

	return (
		<main className="bg-zinc-900">
			<h1 className="text-red-700 text-3xl font-montserrat">lysis</h1>
			<Link to={"/login"} className="text-white">
				go to login
			</Link>
			<br />
			<Link to={"/register"} className="text-white">
				go to register
			</Link>
		</main>
	);
}

export default Home;
