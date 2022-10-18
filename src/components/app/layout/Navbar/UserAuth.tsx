import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spinner
} from '@chakra-ui/react';

import Link from 'next/link';

import { Status } from '../../../../store/auth';

import { useAuthStore } from '../../../../hooks';

export const UserAuth = () => {
	const {
		status,
		userProfile,
		startLogout,
	} = useAuthStore();

	if (status === Status.Checking) {
		return <Spinner></Spinner>;
	} else if (status === Status.Authenticated) {
		return (
			<Flex alignItems={'center'} >
				<Menu>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}
					>
						<Avatar
							size={'sm'}
							src={userProfile!.user.profile_photo_path}
						/>
					</MenuButton>
					<MenuList>
						<Link href='/profile'>
							<MenuItem>

									<div className='flex items-center'>
										<p className='mt-1 ml-2 text-gray-500 hover:underline'>
											Perfil
										</p>
									</div>
							</MenuItem>
						</Link>
						<MenuDivider />
						<MenuItem onClick={startLogout}>
							<div className='flex items-center'>
								<p className='mt-1 ml-2 text-gray-500 hover:underline'>
									Cerrar sesion
								</p>
							</div>
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		);
	} else {
		return (
			<>
				<Link href={'/auth/login'}>
					<Button variant='outline' colorScheme={'blue'}>
						Entrar
					</Button>
				</Link>
				<Link href={'/auth/register'}>
					<Button
						colorScheme={'blue'}
						bg={'blue.400'}
						_hover={{ bg: 'blue.500' }}
						variant='solid'
					>
						Registrarse
					</Button>
				</Link>
			</>
		);
	};
};
