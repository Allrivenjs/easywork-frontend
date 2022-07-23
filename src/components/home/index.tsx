import FloatingLink from "../../shared/FloatingLink";

import Hero from "./components/Hero";
import Features from "./components/Features";
// import Courses from "./components/Courses";
import MentorApplication from "./components/MentorApplication";

const Home = () => {
	return (
		<article>
			<Hero />
			<Features />
			{/*<Courses />*/}
			<MentorApplication />
			<FloatingLink
				to="/tasks/create"
			>
				✍️ Publicar tarea
			</FloatingLink>
		</article>
	);
};

export default Home;
