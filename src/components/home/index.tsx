import FloatingLink from "../../shared/FloatingLink";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";

const Home = () => {
	return (
		<article>
			<Hero />
			<Features />
			<Courses />
			<FloatingLink
				to="/tasks/create"
			>
				✍️ Publicar tarea
			</FloatingLink>
		</article>
	);
};

export default Home;
