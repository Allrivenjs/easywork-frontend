import FloatingButton from "../../shared/FloatingButton";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";

const Home = () => {
	return (
		<article>
			<Hero />
			<Features />
			<Courses />
			<FloatingButton
				to="/create-task"
			>
				✍️ Publicar tarea
			</FloatingButton>
		</article>
	);
};

export default Home;
