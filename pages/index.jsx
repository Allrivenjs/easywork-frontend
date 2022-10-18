import { Box } from '@chakra-ui/react';
import {
	Hero,
	Features,
	MentorApplication
} from '../src/components/home';

import { FloatingLink } from '../src/shared';

import { Layout } from '../src/components/app/layout';

const HomePage = () => {
  return (
		<Layout>
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
		</Layout>
  );
};

export default HomePage;
