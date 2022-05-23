import "../style/main.css";
import Hero from "../components/home/Hero";
import HomeContent from "../components/home/HomeContent";

function Home() {
	return (
		<div className="home">
			<Hero />
			<HomeContent />
		</div>
	);
}

export default Home;
