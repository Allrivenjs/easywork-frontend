import { Box } from '@chakra-ui/react';
import {
	Hero,
	Features,
	MentorApplication
} from '../src/components/home';

import { FloatingLink } from '../src/shared';

import { Layout } from '../src/components/app/layout';
import { AuthProvider } from '../src/context/AuthContext';

const HomePage = () => {
  return (
		<AuthProvider>
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
		</AuthProvider>
  );
};

export default HomePage;
