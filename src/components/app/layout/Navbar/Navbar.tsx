import {
	Box,
	Flex,
	Stack,
} from '@chakra-ui/react';

import {
	UserAuth,
	NavbarLinkButton
} from './';

import { Logo } from '../../../../shared/Logo';

export const Navbar = () => {
	return(
		<Box
			position='fixed'
			zIndex='50'
			width='full'
			p={4}
			px={32}
			bgColor='white'
			borderBottom={1}
			borderStyle='solid'
			borderColor='gray.200'
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
			>
				<Stack
					spacing={4}
					direction='row'
					alignItems='center'
				>
					<Logo />

					<NavbarLinkButton to='/' content='Home'/>
					<NavbarLinkButton to='/tasks' content='Tareas'/>

					<a href='#hero'>
						<p className='text-gray-500 hover:underline'>
							Acerca de nosotros
						</p>
					</a>

					<a href='#features'>
						<p className='text-gray-500 hover:underline'>
							Nuestros servicios
						</p>
					</a>

				</Stack>

				<Stack direction='row'>
					<UserAuth />
				</Stack>
			</Flex>
		</Box>
	);
};
