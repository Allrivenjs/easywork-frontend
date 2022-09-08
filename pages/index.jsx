import { Box } from '@chakra-ui/react';
import {
	Hero,
	Features,
	MentorApplication
} from '../src/components/home';

import { FloatingLink } from '../src/shared';

const HomePage = () => {
  return (
		<Box
			position='relative'
		>
			<FloatingLink
				to="/tasks/create"
			>
				✍️ Publicar tarea
			</FloatingLink>
			<Hero />
			<Features />

			{/*
				*<Courses />
				*/}

			<MentorApplication />
		</Box>
  );
};

export default HomePage;
